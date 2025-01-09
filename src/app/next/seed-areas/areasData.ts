export const areasData = [
  {
    title: 'Custom',
    slug: 'custom'
  },
  {
    title: 'Cover Up',
    slug: 'cover-up'
  },
  {
    title: 'Lower Body',
    slug: 'lower-body'
  },
  {
    title: 'Upper Boddy',
    slug: 'upper-boddy'
  },
  {
    title: 'Connected Piece',
    slug: 'connected-piece'
  },
  {
    title: 'Full Body',
    slug: 'full-body'
  },
  {
    title: 'Neck',
    slug: 'neck',
    parent: {
      title: 'Upper Boddy',
      slug: 'upper-boddy'
    }
  },
  {
    title: 'Leg',
    slug: 'leg',
    parent: {
      title: 'Lower Body',
      slug: 'lower-body'
    }
  },
  {
    title: 'Finger',
    slug: 'finger',
    parent: {
      title: 'Upper Body',
      slug: 'upper-boddy'
    }
  },
  {
    title: 'Chest',
    slug: 'chest',
    parent: {
      title: 'Upper Boddy',
      slug: 'upper-boddy'
    }
  }
]
