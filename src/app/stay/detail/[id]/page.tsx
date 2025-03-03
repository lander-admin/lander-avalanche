import React from 'react';
import StayDetailContainer from '../DetailContainer';
import { findStayById, findPropertyById } from '@/services/listings';
import { notFound } from 'next/navigation';
import CryptoBedSeo from '@/constants/seo';
import { Metadata } from 'next';

export interface StayDetailPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  ...CryptoBedSeo,
  title: 'Lander - Stay Detail',
  description: 'Reserve your stay with Lander. Pay with crypto.',
};

export default async function StayDetailPage({ params }: StayDetailPageProps) {
  try {
    const stay = await findPropertyById(params.id);

    return <StayDetailContainer stay={stay} />;
  } catch (error) {
    console.log(error);
    notFound();
    return;
  }
}
