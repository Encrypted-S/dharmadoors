"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon issue with webpack
const DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconRetinaUrl: "/marker-icon-2x.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Tradition color mapping (aligned with brand guidelines)
const TRADITION_COLORS: Record<string, string> = {
  theravada: "#E97116",      // Saffron Orange (brand primary)
  mahayana: "#168EE9",       // Wisdom Blue (brand secondary)
  vajrayana: "#DC4545",      // Lotus Red
  zen: "#22A55E",            // Bamboo Green
  pure_land: "#3B82F6",      // Sky Blue
  nichiren: "#8B5CF6",       // Royal Purple
  secular: "#6B7280",        // Neutral Gray
  multi_tradition: "#EC4899", // Harmony Pink
  other: "#6B7280",          // Neutral Gray
};

interface Center {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  tradition: string;
  city?: string;
  country: string;
  website?: string;
}

interface SanghaMapProps {
  centers: Center[];
  onCenterClick?: (center: Center) => void;
}

// Component to handle map center updates
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function SanghaMap({ centers, onCenterClick }: SanghaMapProps) {
  // Default center: Australia/NZ region
  const [mapCenter, setMapCenter] = useState<[number, number]>([-28.0, 135.0]);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return (
      <div className="h-full w-full bg-[#F5F3EF] dark:bg-[#1A1714] animate-pulse flex items-center justify-center">
        <span className="text-[#6B6358]">Loading map...</span>
      </div>
    );
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={4}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController center={mapCenter} />

      {centers.map((center) => (
        <Marker
          key={center.id}
          position={[center.latitude, center.longitude]}
          eventHandlers={{
            click: () => onCenterClick?.(center),
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-zinc-900">{center.name}</h3>
              <p className="text-sm text-zinc-600">
                {center.city && `${center.city}, `}{center.country}
              </p>
              <span
                className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs text-white"
                style={{ backgroundColor: TRADITION_COLORS[center.tradition] || "#6b7280" }}
              >
                {center.tradition.replace("_", " ")}
              </span>
              {center.website && (
                <a
                  href={center.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-sm text-[#E97116] hover:underline"
                >
                  Visit Website →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
