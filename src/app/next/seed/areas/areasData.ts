export const areasData = [
  {
    id: 1,
    title: 'Custom',
    slug: 'custom'
  },
  {
    id: 2,
    title: 'Cover Up',
    slug: 'cover-up'
  },
  {
    id: 3,
    title: 'Lower Body',
    slug: 'lower-body'
  },
  {
    id: 4,
    title: 'Upper Boddy',
    slug: 'upper-boddy'
  },
  {
    id: 5,
    title: 'Connected Piece',
    slug: 'connected-piece'
  },
  {
    id: 6,
    title: 'Full Body',
    slug: 'full-body'
  },
  {
    id: 7,
    title: 'Neck',
    slug: 'neck'
  },
  {
    id: 8,
    title: 'Leg',
    slug: 'leg'
  },
  {
    id: 9,
    title: 'Finger',
    slug: 'finger'
  },
  {
    id: 10,
    title: 'Chest',
    slug: 'chest'
  }
]

export const areasWithParentsData = [
  {
    id: 7,
    title: 'Neck',
    slug: 'neck',
    parent: {
      id: 4,
      title: 'Upper Boddy',
      slug: 'upper-boddy'
    }
  },
  {
    id: 8,
    title: 'Leg',
    slug: 'leg',
    parent: {
      id: 3,
      title: 'Lower Body',
      slug: 'lower-body'
    }
  },
  {
    id: 9,
    title: 'Finger',
    slug: 'finger',
    parent: {
      id: 4,
      title: 'Upper Body',
      slug: 'upper-boddy'
    }
  },
  {
    id: 10,
    title: 'Chest',
    slug: 'chest',
    parent: {
      id: 4,
      title: 'Upper Boddy',
      slug: 'upper-boddy'
    }
  }
]
