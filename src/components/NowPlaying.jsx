const NowPlaying = ({ selectedTrack }) => {
  return (
    <div>
      {selectedTrack ? (
        <>
          <h1>Title: {selectedTrack.title}</h1>
          <h2>Artist: {selectedTrack.artist}</h2>
        </>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default NowPlaying;
