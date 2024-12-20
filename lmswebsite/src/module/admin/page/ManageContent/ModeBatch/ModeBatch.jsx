// src/components/ModeBatch.jsx

import React, { useState, useEffect } from 'react';
import {
  Container,
  Form,
  Label,
  Input,
  Select,
  Button,
  ErrorMessage,
  SuccessMessage,
  DiscountInfo,
  FeatureContainer,
  FeatureInput,
  AddFeatureButton,
  FeatureList,
  FeatureItem,
  RemoveFeatureButton,
} from './ModeBatch.style';
import { createTypeOfBatch } from '../../../../../api/typeOfBatchApi';
import { FaPlus, FaTrash } from 'react-icons/fa'; // For icons (optional)

const ModeBatch = () => {
  const [mode, setMode] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [features, setFeatures] = useState([]); // New state for features
  const [featureInput, setFeatureInput] = useState(''); // State for current feature input
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const[title, setTitle] = useState('');

  // Maximum number of features allowed
  const MAX_FEATURES = 10;

  // Calculate discounted price whenever price or discountPercentage changes
  useEffect(() => {
    if (price && discountPercentage !== '') {
      const discount = (parseFloat(discountPercentage) / 100) * parseFloat(price);
      const calculatedDiscountedPrice = parseFloat(price) - discount;
      setDiscountedPrice(calculatedDiscountedPrice.toFixed(2));
    } else {
      setDiscountedPrice('');
    }
  }, [price, discountPercentage]);

  const handleAddFeature = () => {
    const trimmedFeature = featureInput.trim();
    if (trimmedFeature) {
      if (features.includes(trimmedFeature)) {
        setError('This feature has already been added.');
        return;
      }
      if (features.length >= MAX_FEATURES) {
        setError(`You can only add up to ${MAX_FEATURES} features.`);
        return;
      }
      setFeatures([...features, trimmedFeature]);
      setFeatureInput('');
      setError('');
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
    setError('');
  };

  const handleFeatureKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!mode || !price) {
      setError('Please select a mode and enter a price.');
      return;
    }

    // Validate discountPercentage if provided
    if (discountPercentage !== '') {
      const discount = parseFloat(discountPercentage);
      if (isNaN(discount) || discount < 0 || discount > 100) {
        setError('Discount Percentage must be a number between 0 and 100.');
        return;
      }
    }

    // Optional: Validate features if needed (e.g., minimum number of features)
    // if (features.length === 0) {
    //   setError('Please add at least one feature.');
    //   return;
    // }

    const data = {
      mode,
      price: parseFloat(price),
      duration: duration ? parseInt(duration, 10) : undefined,
      discountPercentage: discountPercentage !== '' ? parseFloat(discountPercentage) : undefined,
      discountedPrice: discountedPrice ? parseFloat(discountedPrice) : undefined,
      features, // Include features array
      title
    };

    // Debugging: Log the data being sent to the API
    console.log('Submitting data:', data);

    try {
      const response = await createTypeOfBatch(data);
      console.log('API Response:', response);
      if (response) {
        setSuccess('Type of batch created successfully!');
        // Reset form fields
        setMode('');
        setPrice('');
        setDuration('');
        setDiscountPercentage('');
        setDiscountedPrice('');
        setFeatures([]);
        setFeatureInput('');
        // Optionally, you can remove window.location.reload(); to avoid full page reload
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.error || 'Failed to create Type of Batch.');
    }
  };

  return (
    <Container>
      <h2>Create Type of Batch</h2>
      <Form onSubmit={handleSubmit}>
      <Label htmlFor="title">Batch Title</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Label htmlFor="mode">Type of Batch</Label>
        <Select
          id="mode"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          required
        >
          <option value="">Select Mode</option>
          <option value="1:1">1:1</option>
          <option value="1:3">1:3</option>
          <option value="1:5">1:5</option>
          <option value="1:7">1:7</option>
        </Select>

        <Label htmlFor="price">Price ($)</Label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
          step="0.01"
          required
        />

        {/* <Label htmlFor="discountPercentage">Discount Percentage (%)</Label>
        <Input
          type="number"
          id="discountPercentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(e.target.value)}
          min="0"
          max="100"
          step="0.01"
          placeholder="Optional"
        /> */}

        {discountedPrice && (
          <DiscountInfo>
            Discounted Price: ${discountedPrice}
          </DiscountInfo>
        )}

        {/* <Label htmlFor="duration">Duration (days)</Label>
        <Input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="0"
          step="1"
        /> */}

        {/* New Feature Input Section */}
        <Label htmlFor="features">Features</Label>
        <FeatureContainer>
          <FeatureInput
            type="text"
            id="features"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={handleFeatureKeyDown}
            placeholder="Enter a feature"
          />
          <AddFeatureButton
            type="button"
            onClick={handleAddFeature}
            disabled={!featureInput.trim() || features.length >= MAX_FEATURES}
          >
            <FaPlus /> Add
          </AddFeatureButton>
        </FeatureContainer>

        {features.length >= MAX_FEATURES && (
          <ErrorMessage>You can only add up to {MAX_FEATURES} features.</ErrorMessage>
        )}

        {features.length > 0 && (
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>
                {feature}
                <RemoveFeatureButton type="button" onClick={() => handleRemoveFeature(feature)}>
                  <FaTrash />
                </RemoveFeatureButton>
              </FeatureItem>
            ))}
          </FeatureList>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
};

export default ModeBatch;
