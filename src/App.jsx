import { useEffect, useState } from "react";
import * as trackServices from "./services/trackService";
import TrackForm from "./components/TrackForm";
import TrackList from "./components/TrackList";
import NowPlaying from "./components/NowPlaying";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
    setIsFormOpen(false); 
  };

  const handleFormView = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackServices.create(formData);
      setTracks([newTrack, ...tracks]);
      setIsFormOpen(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackServices.updateTrack(formData, trackId);
      setTracks(tracks.map(track => track._id === updatedTrack._id ? updatedTrack : track));
      setSelectedTrack(null);
      setIsFormOpen(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveTrack = async (trackId) => {
    try {
      await trackServices.deleteTrack(trackId);
      setTracks(tracks.filter(track => track._id !== trackId));
      setSelectedTrack(null);
      setIsFormOpen(false); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTrack = (track) => {
    setSelectedTrack(track);
    setIsFormOpen(true); 
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await trackServices.index();
        setTracks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTracks();
  }, []);

  return (
    <div className="container">
      <header>
        <button onClick={handleFormView}>
          {isFormOpen ? "Close Form" : "Add New Track"}
        </button>
      </header>
      <TrackList
        tracks={tracks}
        onSelectTrack={handleSelectTrack}
        onDeleteTrack={handleRemoveTrack}
        onEditTrack={handleEditTrack}
      />
      {isFormOpen ? (
        <TrackForm
          onAddTrack={handleAddTrack}
          selectedTrack={selectedTrack}
          onUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <NowPlaying selectedTrack={selectedTrack} />
      )}
    </div>
  );
};

export default App;
