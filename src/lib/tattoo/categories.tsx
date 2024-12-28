import React from 'react'

import {
  Binary,
  CircleDot,
  CircleOff,
  Cross,
  Footprints,
  Hand,
  HandMetal,
  Heart,
  Network,
  RefreshCcw,
  Shapes,
  Shield,
  User,
  UserCircle
} from 'lucide-react'

import type { CategoryListProps } from './types'

export const tattooCategories: CategoryListProps[] = [
  {
    id: '0',
    label: 'All',
    icon: <RefreshCcw />,
    path: ''
  },
  {
    id: '1',
    label: 'Hand',
    icon: <Hand />,
    path: 'hand'
  },
  {
    id: '2',
    label: 'Arm',
    icon: <HandMetal />,
    path: 'arm'
  },
  {
    id: '3',
    label: 'Shoulder',
    icon: <Shapes />,
    path: 'shoulder'
  },
  {
    id: '4',
    label: 'Chest',
    icon: <Heart />,
    path: 'chest'
  },
  {
    id: '5',
    label: 'Back',
    icon: <Shield />,
    path: 'back'
  },
  {
    id: '6',
    label: 'Leg',
    icon: <Binary />,
    path: 'leg'
  },
  {
    id: '7',
    label: 'Ankle',
    icon: <CircleDot />,
    path: 'ankle'
  },
  {
    id: '8',
    label: 'Foot',
    icon: <Footprints />,
    path: 'foot'
  },
  {
    id: '9',
    label: 'Neck',
    icon: <Cross />,
    path: 'neck'
  },
  {
    id: '10',
    label: 'Wrist',
    icon: <CircleOff />,
    path: 'wrist'
  },
  {
    id: '11',
    label: 'Finger',
    icon: <Hand />,
    path: 'finger'
  },
  {
    id: '12',
    label: 'Rib',
    icon: <Shapes />,
    path: 'rib'
  },
  {
    id: '13',
    label: 'Hip',
    icon: <Shapes />,
    path: 'hip'
  },
  {
    id: '14',
    label: 'Face',
    icon: <UserCircle />,
    path: 'face'
  },
  {
    id: '15',
    label: 'Full Body',
    icon: <User />,
    path: 'full-body'
  },
  {
    id: '16',
    label: 'Cover Up',
    icon: <Shield />,
    path: 'cover-up'
  },
  {
    id: '17',
    label: 'Connected Pieces',
    icon: <Network />,
    path: 'connected-pieces'
  }
]
