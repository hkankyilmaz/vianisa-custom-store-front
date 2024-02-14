// Ürün moissanite-labdiamond gecisi olacak ise moissanite-labdiamond-select tagı ekelenemli
// Ürün moissanite-diamond gecisi olacak ise moissanite-diamond-select tagı ekelenemli
// ürün diamond ise diamond tagi ekelenmeli
// ürün labdiamond ise lab-diamond tagi ekelenmeli
// ürün moissanite ise moissanite tagi ekelenmeli
//

export const labOrMos = {
  tags: [
    'moissanite-labdiamond-select',
    'moissanite-diamond-select',
    'diamond',
    'lab-diamond',
    'moissanite',
  ],
};

// inputNumber --> Kaç Tane input olduğunu
// placeholder --> input için Label
// labelOnProduct --> Kartta ilgili input girisini tanımlar
// options --> select icin secenekler
// tag --> örneğin ring size için girilmesi gereken tag

export const tags = [
  {
    inputNumber: 1,
    tags: ['ring-size', 'io_ring size (2-14)', 'IO_Ring Size (2-14)'],
    productType: [
      'engagement rings',
      'fashion rings',
      'moissanite wedding bands',
      'diamond wedding bands',
      'classic wedding bands',
      'birthstone rings',
      'bridal sets',
      'simulated diamond engagement rings',
    ],
    placeHolder: 'Choose Your Ring Size',
    name: 'ringSizes',
    inputType: 'select',
    labelOnProduct: 'size',
    options: {
      range: [2, 14],
      delimeter: 0.25,
      optionCount: 49,
    },
  },
  {
    inputNumber: 1,
    tags: ['bracelet-length', 'io_braceletlength', 'IO_braceletlength'],
    placeHolder: 'Bracelet Size',
    name: 'braceletLength',
    inputType: 'select',
    labelOnProduct: 'length',
    options: {
      range: [5, 8],
      delimeter: 0.5,
      optionCount: 7,
    },
  },
  {
    inputNumber: 1,
    tags: ['necklace-length', 'IO_necklacelength'],
    placeHolder: 'Necklace Size',
    name: 'necklaceLenght',
    inputType: 'select',
    labelOnProduct: 'lenght',
    options: {
      range: [14, 20],
      delimeter: 1,
      optionCount: 7,
    },
  },
  {
    inputNumber: 1,
    tags: ['name'],
    placeHolder: 'Personalization ( Custom Name )',
    name: 'name',
    inputType: 'text',
    labelOnProduct: 'name',
  },
  {
    inputNumber: 1,
    tags: ['initial-letter', 'initial_letter'],
    placeHolder: 'Letter',
    name: 'initialLetter',
    inputType: 'select',
    labelOnProduct: 'letter',
    options: [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ],
  },
  {
    inputNumber: 1,
    tags: ['single-birthstone', 'io_singlebirhtstone', 'IO_singlebirhtstone'],
    placeHolder: 'Choose Birthstone',
    name: 'singleBirthstone',
    inputType: 'select',
    labelOnProduct: 'birthstone',
    options: [
      'Garnet (January)',
      'Amethyst (February)',
      'Aquamarine (March)',
      'Diamond (April)',
      'Emerald (May)',
      'Alexandrite (June)',
      'Ruby (July)',
      'Peridot (August)',
      'Sapphire (September)',
      'Pink Tourmaline (October)',
      'Citrine (November)',
      'Blue Topaz (December)',
    ],
  },
  {
    inputNumber: 1,
    tags: [
      'multiple-birthstone',
      'io_multiplebirthstone',
      'IO_multiplebirthstone',
    ],
    placeHolder: 'Please Specify Each Birthstone from Left to Right',
    name: 'multipleBirthStone',
    inputType: 'text',
    labelOnProduct: 'birthstone',
  },
  {
    inputNumber: 3,
    tags: ['expandable-inside-engraving', 'IO_Engraveable'],
    name: 'expandableInsideEngraving',
    inputs: [
      {
        placeHolder: 'Free Custom Inside Engraving (Optional)',
        name: 'isYes',
        inputType: 'checkbox',
        labelOnProduct: 'Free Custom Inside Engraving',
      },
      {
        placeHolder: 'Choose a Font (Refer to Images)',
        name: 'font',
        inputType: 'select',
        labelOnProduct: 'Engraving Font',
        options: [
          'Snell BT',
          'Monotype Corsiva',
          'Times New Roman',
          'NewYork',
          'Helvetica',
          'Garamond',
          'Custom (Add a note in the text)',
        ],
      },
      {
        placeHolder: 'Engraving Text',
        name: 'text',
        inputType: 'text',
        labelOnProduct: 'Engraving Text',
      },
    ],
  },
  {
    inputNumber: 5,
    productType: ['bridal sets'],
    tags: ['bridal-set-inside-engraving'],
    name: 'bridalSetInsideEngraving',
    inputs: [
      {
        placeHolder: 'Free Custom Inside Engraving(Optional)',
        name: 'one',
        inputType: 'checkbox',
        labelOnProduct: 'Free Custom Inside Engraving',
      },
      {
        placeHolder: 'Choose a Font for Engagement Ring(Refer to Images)',
        name: 'second',
        inputType: 'select',
        labelOnProduct: 'Engraving Font for Engagement Ring',
        options: [
          'Snell BT',
          'Monotype Corsiva',
          'Times New Roman',
          'NewYork',
          'Helvetica',
          'Garamond',
          'Custom (Add a note in the text)',
        ],
      },
      {
        placeHolder: 'Engraving Text for Engagement Ring',
        name: 'third',
        inputType: 'text',
        labelOnProduct: 'Engraving Text for Engagement Ring',
      },
      {
        placeHolder: 'Choose a Font for Wedding Band(Refer to Images)',
        name: 'fourth',
        inputType: 'select',
        labelOnProduct: 'Engraving Font for Wedding Band',
        options: [
          'Snell BT',
          'Monotype Corsiva',
          'Times New Roman',
          'NewYork',
          'Helvetica',
          'Garamond',
          'Custom (Add a note in the text)',
        ],
      },
      {
        placeHolder: 'Engraving Text for Wedding Band',
        name: 'five',
        inputType: 'text',
        labelOnProduct: 'Engraving Text for Wedding Band',
      },
    ],
  },
  {
    inputNumber: 3,
    tags: ['signed-outside-engraving-three-letters', 'signet_engrave'],
    name: 'signedOutSideEngraving3Letters',
    inputs: [
      {
        placeHolder: 'Free Outside Engraving (Optional)',
        name: 'one',
        inputType: 'checkbox',
        labelOnProduct: 'Free Outside Engraving',
      },
      {
        placeHolder: 'Choose a Font (Refer to Images)',
        name: 'second',
        inputType: 'select',
        labelOnProduct: 'Engraving Font',
        options: [
          'F01 - Monotype Corsiva',
          'F02 - Times New Roman',
          'Times New Roman',
          'F03 - Helvetica',
          'F04 - Lucida Calligraphy',
          'F05 - Garamond',
          'F06 - Bookman Old Style ',
          'F07 - Edwardian Script',
          'F08 - Old English Text',
        ],
      },
      {
        placeHolder: 'Engraving Letters(up to 3)',
        name: 'third',
        inputType: 'text',
        labelOnProduct: 'Engraving Letters',
      },
    ],
  },
  {
    inputNumber: 3,
    productHandle: [
      '14k-solid-gold-dainty-personalized-signet-ring',
      '14k-gold-elongated-rectangular-signet-ring',
    ],
    tags: ['outside-engraving-25-letters'],
    name: 'outSideEngraving25Letters',
    inputs: [
      {
        placeHolder: 'Free Outside Engraving (Optional)',
        name: 'one',
        inputType: 'checkbox',
        labelOnProduct: 'Free Outside Engraving',
      },
      {
        placeHolder: 'Choose a Font(Refer to Images)',
        name: 'second',
        inputType: 'select',
        labelOnProduct: 'Engraving Font',
        options: [
          'F01 - Monotype Corsiva',
          'F02 - Times New Roman',
          'Times New Roman',
          'F03 - Helvetica',
          'F04 - Lucida Calligraphy',
          'F05 - Garamond',
          'F06 - Bookman Old Style ',
          'F07 - Edwardian Script',
          'F08 - Old English Text',
        ],
      },
      {
        placeHolder: 'Engraving Letters(up to 25)',
        name: 'third',
        inputType: 'text',
        labelOnProduct: 'Engraving Letters',
      },
    ],
  },
  {
    inputNumber: 1,
    productHandle: ['zodiac-signet-ring'],
    tags: ['single-birthstone'],
    placeHolder: 'Choose Zodiac Engraving(Optional-See Images)',
    name: 'outsideEngravingZodiac',
    inputType: 'select',
    labelOnProduct: 'Outside Zodiac Engraving',
    options: [
      '1 - Aries',
      '2 - Taurus',
      '3 - Gemini',
      '4 - Cancer',
      '5 - Leo',
      '6 - Virgo',
      '7 - Libra',
      '8 - Scorpio',
      '9 - Sagittarius',
      '10 - Capricorn',
      '11 - Aquarius',
      '12 - Pisces',
    ],
  },
];
