import { useState, useEffect } from "react";

const TrackForm = ({ onAddTrack, selectedTrack, onUpdateTrack }) => {
  const initialState = {
    title: "",
    artist: "",
  };

  const [formData, setFormData] = useState(selectedTrack || initialState);

  useEffect(() => {
    setFormData(selectedTrack || initialState);
  }, [selectedTrack]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTrack) {
      onUpdateTrack(formData, selectedTrack._id);
    } else {
      onAddTrack(formData);
    }
    setFormData(initialState);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="artist">Artist: </label>
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <br />
        <button type="submit">
          {selectedTrack ? "Update Track" : "Add New Track"}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
