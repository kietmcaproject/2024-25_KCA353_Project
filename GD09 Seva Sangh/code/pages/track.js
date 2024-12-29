export default function Track() {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Track Your Donations</h1>
        <p>Enter your tracking ID to see the status of your donations.</p>
        <form>
          <label htmlFor="trackingId">Tracking ID:</label>
          <input type="text" id="trackingId" name="trackingId" />
          <button type="submit">Track</button>
        </form>
      </div>
    );
  }
  