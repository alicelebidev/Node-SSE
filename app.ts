import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (optional)
app.use(express.static('public'));

/*
    SSE endpoint
    When a client connects to this endpoint, the server sends a message
    containing the current time every 2 seconds. The connection is kept
    open, allowing  the server to send updates to the client as long as
    the connection remains active.
*/
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send a message to the client every 2 seconds
  const intervalId = setInterval(() => {
    const message = `data: ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
  }, 2000);

  // Close the connection when the client disconnects
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
