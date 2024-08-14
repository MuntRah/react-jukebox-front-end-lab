const TrackList = ({ tracks, onSelectTrack, onDeleteTrack, onEditTrack }) => {
  return (
    <section>
      <ul>
        {tracks.map((track) => (
          <li key={track._id}>
            <div>
              <h2>{track.title}</h2> by {track.artist}
            </div>
            <button onClick={() => onSelectTrack(track)}>Play</button>
            <button onClick={() => onEditTrack(track)}>Edit</button>
            <button onClick={() => onDeleteTrack(track._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrackList;
