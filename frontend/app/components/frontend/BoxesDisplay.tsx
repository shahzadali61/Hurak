"use client";
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Alert, Button } from 'antd';
import api from '@/lib/axios';

interface Box {
  id: number;
  height: number;
  width: number;
  count: number;
}

interface GeneratedBox extends Omit<Box, 'id'> {
  id: string;
  iteration: number;
}

const BoxesDisplay: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [colorOrder, setColorOrder] = useState<string[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [boxOrder, setBoxOrder] = useState<number[]>([]);

  // Define available colors
  const colors = ['blue', 'green', 'red', 'pink', 'grey', 'yellow'];

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        setLoading(true);
        const response = await api.get<Box[]>('/boxes');
        setBoxes(response.data);
        setError(null);
        // Initialize color order
        setColorOrder([...colors]);
        // Initialize box order (shuffled)
        const totalBoxes = response.data.reduce((sum, box) => sum + box.count, 0);
        const shuffledOrder = Array.from({ length: totalBoxes }, (_, i) => i + 1)
          .sort(() => Math.random() - 0.5);
        setBoxOrder(shuffledOrder);
      } catch (err) {
        console.error('Error fetching boxes:', err);
        setError('Failed to fetch boxes data');
      } finally {
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  // Shuffle colors function
  const shuffleColors = () => {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    setColorOrder(shuffled);
    setIsSorted(false);
  };

  // Sort boxes function
  const sortBoxes = () => {
    if (isSorted) {
      // If currently sorted, shuffle the boxes
      const totalBoxes = generatedBoxes.length;
      const shuffledOrder = Array.from({ length: totalBoxes }, (_, i) => i + 1)
        .sort(() => Math.random() - 0.5);
      setBoxOrder(shuffledOrder);
    }
    setIsSorted(!isSorted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description={error}
        type="error"
        showIcon
        className="mb-4"
      />
    );
  }

  // Generate boxes based on count value
  const generateBoxes = (): GeneratedBox[] => {
    const allBoxes: GeneratedBox[] = [];
    
    boxes.forEach((boxData: Box) => {
      // Loop until we reach the count value
      for (let i = 0; i < boxData.count; i++) {
        const generatedBox: GeneratedBox = {
          height: boxData.height,
          width: boxData.width,
          count: boxData.count,
          id: `${boxData.id}-${i + 1}`, // Unique ID for each generated box
          iteration: i + 1
        };
        allBoxes.push(generatedBox);
      }
    });
    
    return allBoxes;
  };

  const generatedBoxes = generateBoxes();

  // Get color for each box based on color order
  const getBoxColor = (index: number) => {
    const colorIndex = index % colorOrder.length;
    const color = colorOrder[colorIndex];
    
    // Return color styles for each color
    const colorStyles = {
      blue: { borderColor: '#3b82f6', backgroundColor: '#dbeafe' },
      green: { borderColor: '#10b981', backgroundColor: '#d1fae5' },
      red: { borderColor: '#ef4444', backgroundColor: '#fee2e2' },
      pink: { borderColor: '#ec4899', backgroundColor: '#fce7f3' },
      grey: { borderColor: '#6b7280', backgroundColor: '#f3f4f6' },
      yellow: { borderColor: '#eab308', backgroundColor: '#fef3c7' }
    };
    
    return colorStyles[color as keyof typeof colorStyles] || colorStyles.blue;
  };

  // Sort boxes if needed
  const displayBoxes = isSorted 
    ? [...generatedBoxes].sort((a, b) => a.iteration - b.iteration)
    : generatedBoxes.sort((a, b) => {
        const aIndex = boxOrder.indexOf(a.iteration);
        const bIndex = boxOrder.indexOf(b.iteration);
        return aIndex - bIndex;
      });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Control Buttons */}
      <div className="flex gap-4 mb-6">
        <Button 
          type="primary" 
          onClick={shuffleColors}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Shuffle Colours
        </Button>
        <Button 
          type="default" 
          onClick={sortBoxes}
          className={isSorted ? "bg-green-500 text-white hover:bg-green-600" : ""}
        >
          {isSorted ? "Unsort Boxes" : "Sort Boxes"}
        </Button>
      </div>

      {/* Boxes Display */}
      <div className="flex flex-col items-center gap-4">
        {displayBoxes.map((box, index) => {
          const colorStyle = getBoxColor(index);
          return (
            <div
              key={box.id}
              className="border-2 mb-1"
              style={{
                height: `${box.height}px`, // Use actual height from API
                width: `${box.width}px`,   // Use actual width from API
                minHeight: '40px', // Ensure minimum visibility
                minWidth: '40px',
                borderColor: colorStyle.borderColor,
                backgroundColor: colorStyle.backgroundColor
              }}
            >
                {box.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoxesDisplay;
