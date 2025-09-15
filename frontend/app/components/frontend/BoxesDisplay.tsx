"use client";
import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin, Alert, Button } from 'antd';
import api from '@/lib/axios';

interface Box {
  id: number;
  height: number;
  width: number;
  count: number;
  colour?: string;
}

interface GeneratedBox extends Omit<Box, 'id'> {
  id: string;
  iteration: number;
}

const BoxesDisplay: React.FC = () => {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSorted, setIsSorted] = useState(true);
  const [shuffledBoxes, setShuffledBoxes] = useState<GeneratedBox[]>([]);
  const [colorsShuffled, setColorsShuffled] = useState(false);

  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        setLoading(true);
        const response = await api.get<Box[]>('/boxes');
        setBoxes(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching boxes:', err);
        setError('Failed to fetch boxes data');
      } finally {
        setLoading(false);
      }
    };

    fetchBoxes();
  }, []);

  // Initialize shuffled boxes when boxes data changes
  useEffect(() => {
    if (boxes.length > 0) {
      const allBoxes: GeneratedBox[] = [];
      
      // Create one box per database row
      boxes.forEach((boxData: Box, index: number) => {
        const generatedBox: GeneratedBox = {
          height: boxData.height,
          width: boxData.width,
          count: boxData.count,
          colour: boxData.colour,
          id: `${boxData.id}`,
          iteration: index + 1
        };
        allBoxes.push(generatedBox);
      });
      
      const shuffled = [...allBoxes].sort(() => Math.random() - 0.5);
      setShuffledBoxes(shuffled);
    }
  }, [boxes]);

  // Shuffle colors function - shuffles the API colors
  const shuffleColors = () => {
    setColorsShuffled(!colorsShuffled);
  };

  // Sort boxes function
  const sortBoxes = () => {
    if (isSorted) {
      // If currently sorted, shuffle the boxes
      const shuffled = [...generatedBoxes].sort(() => Math.random() - 0.5);
      setShuffledBoxes(shuffled);
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

  // Generate boxes based on database rows (one box per row)
  const generateBoxes = (): GeneratedBox[] => {
    const allBoxes: GeneratedBox[] = [];
    
    // Create one box per database row
    boxes.forEach((boxData: Box, index: number) => {
      const generatedBox: GeneratedBox = {
        height: boxData.height,
        width: boxData.width,
        count: boxData.count,
        colour: boxData.colour,
        id: `${boxData.id}`,
        iteration: index + 1
      };
      allBoxes.push(generatedBox);
    });
    
    return allBoxes;
  };

  const generatedBoxes = generateBoxes();

  // Get color for each box - use shuffled API colors
  const getBoxColor = (box: GeneratedBox, index: number) => {
    if (colorsShuffled) {
      // When colors are shuffled, get all API colors and shuffle them
      const allApiColors = generatedBoxes.map(b => b.colour).filter(Boolean);
      const shuffledApiColors = [...allApiColors].sort(() => Math.random() - 0.5);
      const colorIndex = index % shuffledApiColors.length;
      const shuffledColor = shuffledApiColors[colorIndex];
      
      if (shuffledColor) {
        return { backgroundColor: shuffledColor };
      }
    }
    
    // Use original API colour when not shuffled
    if (box.colour) {
      return { backgroundColor: box.colour };
    }
    
    // Default color if no API colour provided
    return { backgroundColor: '#e5e7eb' }; // Light grey as fallback
  };

  // Sort boxes if needed
  const displayBoxes = isSorted 
    ? [...generatedBoxes].sort((a, b) => a.iteration - b.iteration)
    : shuffledBoxes;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Control Buttons */}
      <div className="flex gap-4 mb-6">
        <Button 
          type="primary" 
          onClick={shuffleColors}
          className={colorsShuffled ? "bg-purple-500 hover:bg-purple-600" : "bg-blue-500 hover:bg-blue-600"}
        >
          {colorsShuffled ? "Use API Colors" : "Shuffle Colours"}
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
          const colorStyle = getBoxColor(box, index);
          return (
            <div
              key={box.id}
              className="mb-1 flex items-center justify-center text-white font-bold"
              style={{
                height: `${box.height}px`, // Use actual height from API
                width: `${box.width}px`,   // Use actual width from API
                minHeight: '40px', // Ensure minimum visibility
                minWidth: '40px',
                backgroundColor: colorStyle.backgroundColor
              }}
            >
                {box.iteration}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoxesDisplay;
