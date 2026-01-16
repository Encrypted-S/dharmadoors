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

// Tradition color mapping
const TRADITION_COLORS: Record<string, string> = {
  theravada: "#f59e0b",
  mahayana: "#3b82f6",
  vajrayana: "#ef4444",
  zen: "#22c55e",
  pure_land: "#3b82f6",
  nichiren: "#8b5cf6",
  secular: "#6b7280",
  multi_tradition: "#ec4899",
  other: "#6b7280",
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
      <div className="h-full w-full bg-amber-50 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
        <span className="text-zinc-500">Loading map...</span>
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
                  className="block mt-2 text-sm text-amber-600 hover:underline"
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
