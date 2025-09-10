import React from 'react';

type Props = {
  trend: {
    title: string;
    source: string;
    description: string;
  };
};

const TrendCard = ({ trend }: Props) => {
  return (
    <div className="card">
      <h2>{trend.title}</h2>
      <p>{trend.description}</p>
      <span>Source: {trend.source}</span>
    </div>
  );
};

export default TrendCard;

