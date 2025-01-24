type MockTatttoo = {
  title: string
  slug: string
  richTextContent?: {
    root: {
      type: string
      children: {
        type: string

        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
    }
    [k: string]: unknown
  }
  images: {
    alt: string
    url: string
    filename: string
    mimeType: string
    width?: number
    height?: number
  }[]
  style: {
    title: string
    slug: string
  }[]
  area: {
    title: string
    slug: string
  }[]
  tags: {
    title: string
    slug: string
  }[]
}

const mockDescription: MockTatttoo['richTextContent'] = {
  root: {
    type: 'root',
    format: '',
    indent: 0,

    children: [
      {
        tag: 'h2',
        type: 'heading',
        format: 'left',
        indent: 0,

        children: [
          {
            mode: 'normal',
            text: 'What is Lorem Ipsum?',
            type: 'text',
            style: '',
            detail: 0,
            format: 0
          }
        ],
        direction: 'ltr'
      },
      {
        type: 'paragraph',
        format: 'justify',
        indent: 0,

        children: [
          {
            mode: 'normal',
            text: 'Lorem Ipsum',
            type: 'text',
            style: '',
            detail: 0,
            format: 1
          },
          {
            mode: 'normal',
            text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            type: 'text',
            style: '',
            detail: 0,
            format: 0
          }
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0
      },
      {
        tag: 'h2',
        type: 'heading',
        format: 'left',
        indent: 0,

        children: [
          {
            mode: 'normal',
            text: 'Why do we use it?',
            type: 'text',
            style: '',
            detail: 0,
            format: 0
          }
        ],
        direction: 'ltr'
      },
      {
        type: 'paragraph',
        format: 'justify',
        indent: 0,

        children: [
          {
            mode: 'normal',
            text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
            type: 'text',
            style: '',
            detail: 0,
            format: 0
          }
        ],
        direction: 'ltr',
        textStyle: '',
        textFormat: 0
      }
    ],
    direction: 'ltr'
  }
}

export const tattoosData: MockTatttoo[] = [
  {
    title: 'Japanese Dragon Sleeve',
    slug: 'japanese-dragon-sleeve',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Japanese Dragon Sleeve Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/ykpvl9ajtzadjwusn4dy.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 731,
        height: 977
      }
    ],
    style: [
      {
        title: 'Japanese',
        slug: 'japanese'
      }
    ],
    area: [
      {
        title: 'Upper Boddy',
        slug: 'upper-boddy'
      }
    ],
    tags: [
      {
        title: 'Dragons',
        slug: 'dragons'
      },
      {
        title: 'Mythology',
        slug: 'mythology'
      }
    ]
  },
  {
    title: 'Traditional Rose',
    slug: 'traditional-rose',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Traditional Rose Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920721/pikertattoos/mock/bv4bu9vttjtqhth8mg0n.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 736,
        height: 1104
      }
    ],
    style: [
      {
        title: 'Traditional',
        slug: 'traditional'
      }
    ],
    area: [
      {
        title: 'Chest',
        slug: 'chest'
      }
    ],
    tags: [
      {
        title: 'Flowers',
        slug: 'flowers'
      },
      {
        title: 'Nature',
        slug: 'nature'
      }
    ]
  },
  {
    title: 'Geometric Wolf',
    slug: 'geometric-wolf',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Geometric Wolf Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/wmrcsg3ubakmjys2tv5d.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 720,
        height: 907
      }
    ],
    style: [
      {
        title: 'Geometric',
        slug: 'geometric'
      }
    ],
    area: [
      {
        title: 'Leg',
        slug: 'leg'
      }
    ],
    tags: [
      {
        title: 'Animals',
        slug: 'animals'
      },
      {
        title: 'Symbols',
        slug: 'symbols'
      }
    ]
  },
  {
    title: 'Realistic Portrait',
    slug: 'realistic-portrait',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Realistic Portrait Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/udufsuhd2kfmilo0lp8r.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 735,
        height: 1092
      }
    ],
    style: [
      {
        title: 'Realism',
        slug: 'realism'
      }
    ],
    area: [
      {
        title: 'Upper Boddy',
        slug: 'upper-boddy'
      }
    ],
    tags: [
      {
        title: 'Portrait',
        slug: 'portrait'
      }
    ]
  },
  {
    title: 'Mandala Finger Band',
    slug: 'mandala-finger-band',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Mandala Finger Band Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/gt9omn3w8cdzteqkyrvm.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 736,
        height: 736
      }
    ],
    style: [
      {
        title: 'Minimalist',
        slug: 'minimalist'
      }
    ],
    area: [
      {
        title: 'Finger',
        slug: 'finger'
      }
    ],
    tags: [
      {
        title: 'Mandala',
        slug: 'mandala'
      },
      {
        title: 'Spiritual',
        slug: 'spiritual'
      }
    ]
  },
  {
    title: 'Celtic Cross Cover-up',
    slug: 'celtic-cross-cover-up',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Celtic Cross Cover-up Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/augjyyr6hziqpwcfimte.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 736,
        height: 736
      }
    ],
    style: [
      {
        title: 'Blackwork',
        slug: 'blackwork'
      }
    ],
    area: [
      {
        title: 'Cover-up',
        slug: 'cover-up'
      }
    ],
    tags: [
      {
        title: 'Celtic',
        slug: 'celtic'
      },
      {
        title: 'Religious',
        slug: 'religious'
      }
    ]
  },
  {
    title: 'Watercolor Abstract',
    slug: 'watercolor-abstract',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Watercolor Abstract Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920721/pikertattoos/mock/kmpqe5npmq4ihnxpxb6t.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 736,
        height: 736
      }
    ],
    style: [
      {
        title: 'Watercolor',
        slug: 'watercolor'
      }
    ],
    area: [
      {
        title: 'Neck',
        slug: 'neck'
      }
    ],
    tags: [
      {
        title: 'Abstract',
        slug: 'abstract'
      }
    ]
  },
  {
    title: 'Neo Traditional Skull',
    slug: 'neo-traditional-skull',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Neo Traditional Skull Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/sj33gbeypqcdk3tb7mj5.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 736,
        height: 868
      }
    ],
    style: [
      {
        title: 'Neo Traditional',
        slug: 'neo-traditional'
      }
    ],
    area: [
      {
        title: 'Lower Body',
        slug: 'lower-body'
      }
    ],
    tags: [
      {
        title: 'Skull',
        slug: 'skull'
      }
    ]
  },
  {
    title: 'Musical Notes Script',
    slug: 'musical-notes-script',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Musical Notes Script Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/kaepqqxuhpomj4vjy5s2.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 736,
        height: 1177
      }
    ],
    style: [
      {
        title: 'Minimalist',
        slug: 'minimalist'
      }
    ],
    area: [
      {
        title: 'Custom',
        slug: 'custom'
      }
    ],
    tags: [
      {
        title: 'Music',
        slug: 'music'
      },
      {
        title: 'Script',
        slug: 'script'
      }
    ]
  },
  {
    title: 'Tribal Phoenix',
    slug: 'tribal-phoenix',
    richTextContent: mockDescription,
    images: [
      {
        alt: 'Tribal Phoenix Tattoo',
        url: 'https://res.cloudinary.com/mohmdevcloud/image/upload/v1735920720/pikertattoos/mock/w9jeag64fhigleddffrq.jpg',
        filename: 'sample-tattoo-image.jpg',
        mimeType: 'image/jpeg',
        width: 600,
        height: 600
      }
    ],
    style: [
      {
        title: 'Tribal',
        slug: 'tribal'
      }
    ],
    area: [
      {
        title: 'Full Body',
        slug: 'full-body'
      }
    ],
    tags: [
      {
        title: 'Animals',
        slug: 'animals'
      },
      {
        title: 'Mythology',
        slug: 'mythology'
      }
    ]
  }
]
