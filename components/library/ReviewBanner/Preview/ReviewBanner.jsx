import { useState } from 'react';
import { Card, BlockStack, Text, InlineStack, Button } from '@shopify/polaris';
import { XIcon } from '@shopify/polaris-icons';
/**
 * A banner component that allows users to submit reviews using a 5-star rating system.
 * @param {Object} props - The component props
 * @param {string} props.title - The title text to display in the banner
 * @param {string} props.description - The description text to display below the title
 * @param {Function} props.onReview - Callback function that receives the selected rating (1-5)
 * @param {Function} props.onClose - Callback function that handles the close action
 * @returns {JSX.Element} A card containing the review banner
 */
export function ReviewBanner({ title, description, onReview, onClose }) {
  return (
    <Card>
      <BlockStack gap='400'>
        <BlockStack gap='200'>
          <InlineStack align='space-between' blockAlign='center'>
            <Text as='h3' variant='headingMd'>
              {title}
            </Text>
            <Button icon={XIcon} variant='tertiary' onClick={onClose} />
          </InlineStack>
          <Text as='p' variant='bodyMd' tone='subdued'>
            {description}
          </Text>
        </BlockStack>
        <ReviewStars onReview={onReview} />
      </BlockStack>
    </Card>
  );
}

/**
 * A star rating component that allows users to select a rating between 1 and 5 stars.
 * @param {Object} props - The component props
 * @param {Function} props.onChange - Callback function that receives the selected rating (1-5)
 * @returns {JSX.Element} A row of interactive star icons
 */
function ReviewStars({ onReview }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(null);

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    onReview(newRating);
  };

  return (
    <div style={{ display: 'flex', gap: '5px' }}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(null)}
          style={{ cursor: 'pointer', transition: 'color 0.1s' }}
        >
          <StarIcon filled={index < (hoverRating || rating)} id={`review-banner-${index}`} />
        </span>
      ))}
    </div>
  );
}

/**
 * A star icon component that can be filled or unfilled.
 * @param {Object} props - The component props
 * @param {boolean} props.filled - Whether the star should be filled (gold gradient) or unfilled (gray)
 * @param {string} props.id - Unique identifier for the gradient definition
 * @returns {JSX.Element} An SVG star icon
 */
function StarIcon({ filled, id }) {
  return (
    <svg width='20' height='20' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id={id} x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop
            offset='0%'
            style={{
              stopColor: filled ? '#FFD700' : '#d1d1d1'
            }}
          />
          <stop
            offset='100%'
            style={{
              stopColor: filled ? '#FFA500' : '#a9a9a9'
            }}
          />
        </linearGradient>
      </defs>
      <path
        d='M12 1.5l2.9 6.2c.1.2.3.4.5.4l6.5.9c.5.1.7.7.3 1.1l-4.7 4.6c-.2.2-.3.4-.2.7l1.1 6.5c.1.5-.5.9-.9.7l-5.8-3.1c-.2-.1-.5-.1-.7 0l-5.8 3.1c-.5.2-1-.2-.9-.7l1.1-6.5c0-.2 0-.5-.2-.7l-4.7-4.6c-.4-.4-.2-1 .3-1.1l6.5-.9c.2 0 .4-.2.5-.4l2.9-6.2c.2-.5.9-.5 1.2 0z'
        fill={`url(#${id})`}
        stroke={filled ? '#FFA500' : '#a9a9a9'}
        strokeWidth='1'
      />
      <path
        d='M12 4.5l1.8 3.8c.2.4.6.7 1 .8l4 .6-2.9 2.8c-.3.3-.5.8-.4 1.2l.7 4-3.6-1.9c-.4-.2-.9-.2-1.3 0l-3.6 1.9.7-4c.1-.4-.1-.9-.4-1.2l-2.9-2.8 4-.6c.4-.1.8-.4 1-.8L12 4.5z'
        fill={filled ? '#FFE45C' : '#d8d8d8'}
        opacity='0.6'
      />
    </svg>
  );
}
