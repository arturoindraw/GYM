/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DisciplinesSection } from './components/DisciplinesSection';
import { ScheduleBookingSection } from './components/ScheduleBookingSection';
import { PricingSection } from './components/PricingSection';
import { SocialProofSection } from './components/SocialProofSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { AiFitnessCoachModal } from './components/AiFitnessCoachModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { PixelTrackerPanel, TrackingEventItem } from './components/PixelTrackerPanel';

const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

export default function App() {
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [trackingEvents, setTrackingEvents] = useState<TrackingEventItem[]>([
    {
      id: 'init-1',
      eventName: 'PageView',
      platform: 'both',
      params: { page: 'Pereira Gym Landing', title: 'FUEGO FIT Club' },
      timestamp: 'Recién cargado',
    },
    {
      id: 'init-2',
      eventName: 'ViewContent',
      platform: 'meta',
      params: { content_name: 'Hero & Instalaciones Pereira', category: 'Fitness' },
      timestamp: 'Recién cargado',
    },
  ]);

  // Log tracking event locally and to server
  const handleTrackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
    const newEvent: TrackingEventItem = {
      id: `evt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      eventName,
      platform: 'both',
      params,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setTrackingEvents((prev) => [newEvent, ...prev]);

    if (!isDemoMode) {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName,
          params,
        }),
      }).catch(() => {
        // ignore
      });
    }
  };

  const handleOpenBooking = (_className?: string) => {
    const scheduleSection = document.getElementById('horarios');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleTrackEvent('InitiateBookingIntent', { source: 'hero_or_nav' });
  };

  const handleSelectDisciplineToBook = (disciplineId: string) => {
    setDisciplineFilter(disciplineId);
    const scheduleSection = document.getElementById('horarios');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleTrackEvent('ViewDisciplineSchedule', { disciplineId });
  };

  const handleSelectPlanForBooking = (planName: string) => {
    handleOpenBooking();
    handleTrackEvent('PlanIntent', { planName });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        onOpenCoach={() => {
          setCoachModalOpen(true);
          handleTrackEvent('OpenAiCoach');
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenCoach={() => {
            setCoachModalOpen(true);
            handleTrackEvent('OpenAiCoach');
          }}
        />

        {/* Disciplines & Zones Section */}
        <DisciplinesSection
          onSelectDisciplineToBook={handleSelectDisciplineToBook}
        />

        {/* Schedule & Live Spots Booking Section */}
        <ScheduleBookingSection
          initialDisciplineFilter={disciplineFilter}
          onTrackEvent={handleTrackEvent}
        />

        {/* Pricing & Membership Plans */}
        <PricingSection
          onSelectPlanForBooking={handleSelectPlanForBooking}
          onTrackEvent={handleTrackEvent}
        />

        {/* Social Proof (Google Reviews & Instagram Feed) */}
        <SocialProofSection />

        {/* Location & Hours in Pereira */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Fitness & Routine Coach Modal */}
      <AiFitnessCoachModal
        isOpen={coachModalOpen}
        onClose={() => setCoachModalOpen(false)}
        onOpenBookingForClass={(clsName) => {
          handleOpenBooking(clsName);
        }}
      />

      {/* Floating WhatsApp Quick Conversion Button */}
      <WhatsAppFloatingButton
        onTrackEvent={handleTrackEvent}
      />

      {/* Meta Pixel & GA4 Conversion Monitor */}
      <PixelTrackerPanel
        events={trackingEvents}
      />
    </div>
  );
}
