import React, { useEffect, useRef, useState, useContext } from 'react';
import { SocketContext } from '../Context';
import '../styles.css';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef();
  const drawing = useRef(false);

  // Socket Context
  const { emitDrawing, roomId, socket } = useContext(SocketContext);

  // State for tool settings
  const [toolSize, setToolSize] = useState(2);
  const [eraserSize, setEraserSize] = useState(10);
  const [toolColor, setToolColor] = useState('black');
  const [toolType, setToolType] = useState('pen'); // pen, pencil, eraser

  // Draw line function
  const drawLine = (x, y, prevX, prevY, color, size) => {
    if (!ctxRef.current) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(prevX, prevY);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = size;
    ctxRef.current.stroke();
  };

  useEffect(() => {
    // Setup canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 600;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = 'round';
    ctxRef.current = ctx;

    const handleDrawEvent = (data) => {
      drawLine(data.x, data.y, data.prevX, data.prevY, data.color, data.size);
    };

    if (socket) {
      socket.on('draw', handleDrawEvent);

      return () => {
        socket.off('draw', handleDrawEvent);
      };
    }
    return 0;
  }, [socket]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    drawing.current = { x: offsetX, y: offsetY };
  };

  const handleMouseMove = (e) => {
    if (!drawing.current || !roomId) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const prevPos = drawing.current;

    const drawColor = toolType === 'eraser' ? 'white' : toolColor;
    const drawSize = toolType === 'eraser' ? eraserSize : toolSize;

    drawLine(offsetX, offsetY, prevPos.x, prevPos.y, drawColor, drawSize);

    emitDrawing({
      x: offsetX,
      y: offsetY,
      prevX: prevPos.x,
      prevY: prevPos.y,
      color: drawColor,
      size: drawSize,
    });

    drawing.current = { x: offsetX, y: offsetY };
  };

  const handleMouseUp = () => {
    drawing.current = false;
  };

  const handleMouseLeave = () => {
    drawing.current = false;
  };

  return (
    <div className="whiteboard-container">
      <canvas
        ref={canvasRef}
        style={{
          border: '2px solid #444',
          backgroundColor: 'white',
          cursor: roomId ? 'crosshair' : 'not-allowed',
          borderRadius: '10px',
          boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />

      {/* Tools Section */}
      <div className="controls">
        <button
          type="button"
          className={`tool-button ${toolType === 'pen' ? 'active' : ''}`}
          onClick={() => setToolType('pen')}
        >
          ✒️ Pen
        </button>
        <button
          type="button"
          className={`tool-button ${toolType === 'pencil' ? 'active' : ''}`}
          onClick={() => setToolType('pencil')}
        >
          ✏️ Pencil
        </button>
        <button
          type="button"
          className={`tool-button ${toolType === 'eraser' ? 'active' : ''}`}
          onClick={() => setToolType('eraser')}
        >
          🧼 Eraser
        </button>

        {/* Color Picker */}
        <input
          type="color"
          className="color-picker"
          value={toolColor}
          onChange={(e) => setToolColor(e.target.value)}
          disabled={toolType === 'eraser'}
        />

        {/* Pen & Pencil Size Adjuster */}
        {toolType !== 'eraser' && (
          <input
            type="range"
            min="1"
            max="10"
            value={toolSize}
            onChange={(e) => setToolSize(e.target.value)}
            className="size-slider"
          />
        )}

        {/* Eraser Size Adjuster */}
        {toolType === 'eraser' && (
          <input
            type="range"
            min="5"
            max="50"
            value={eraserSize}
            onChange={(e) => setEraserSize(e.target.value)}
            className="size-slider"
          />
        )}
      </div>

      {!roomId && (
        <div className="error-message">
          Join a call to enable whiteboard collaboration
        </div>
      )}
    </div>
  );
};

export default Whiteboard;
