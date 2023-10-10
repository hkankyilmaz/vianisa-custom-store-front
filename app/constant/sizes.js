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

export const tags = {
  ringSizes: {
    inputNumber: 1,
    tag: ['ring-size'],
    placeHolder: 'Choose Your Ring Size',
    name: 'ringSizes',
    inputType: 'select',
    labelOnProduct: 'size',
    options: {
      range: [2, 14],
      delimeter: 0.25,
    },
  },
  braceletLength: {
    inputNumber: 1,
    tag: ['bracelet-length'],
    placeHolder: 'Bracelet Size',
    name: 'braceletLength',
    inputType: 'select',
    labelOnProduct: 'length',
    options: {
      range: [5, 8],
      delimeter: 0.5,
    },
  },
  necklaceLenght: {
    inputNumber: 1,
    tag: ['necklace-length'],
    placeHolder: 'Necklace Size',
    name: 'necklaceLenght',
    inputType: 'select',
    labelOnProduct: 'lenght',
    options: {
      range: [14, 20],
      delimeter: 1,
    },
  },
  name: {
    inputNumber: 1,
    tag: ['name'],
    placeHolder: 'Personalization(Custom Name)',
    name: 'name',
    inputType: 'text',
    labelOnProduct: 'name',
  },
  initialLetter: {
    inputNumber: 1,
    tag: ['initial-letter'],
    placeHolder: 'Letter',
    name: 'initialLetter',
    inputType: 'text',
    labelOnProduct: 'letter',
  },
  singleBirthstone: {
    inputNumber: 1,
    tag: ['single-birthstone'],
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
  multipleBirthStone: {
    inputNumber: 1,
    tag: ['multiple-birthstone'],
    placeHolder: 'Please Specify Each Birthstone from Left to Right',
    name: 'multipleBirthStone',
    inputType: 'text',
    labelOnProduct: 'birthstone',
  },
  expandableInsideEngraving: {
    inputNumber: 3,
    tag: ['expandable-inside-engraving'],
    name: 'multipleBirthStone',
    inputs: {
      first: {
        placeHolder: 'Free Custom Inside Engraving(Optional)',
        name: 'one',
        inputType: 'checkbox',
        labelOnProduct: 'Free Custom Inside Engraving',
      },
      second: {
        placeHolder: 'Choose a Font(Refer to Images)',
        name: 'second',
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
      third: {
        placeHolder: 'Engraving Text',
        name: 'third',
        inputType: 'text',
        labelOnProduct: 'Engraving Text',
      },
    },
  },
  bridalSetInsideEngraving: {
    inputNumber: 5,
    tag: ['bridal-set-inside-engraving'],
    name: 'bridalSetInsideEngraving',
    inputs: {
      first: {
        placeHolder: 'Free Custom Inside Engraving(Optional)',
        name: 'one',
        inputType: 'checkbox',
        labelOnProduct: 'Free Custom Inside Engraving',
      },
      second: {
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
      third: {
        placeHolder: 'Engraving Text for Engagement Ring',
        name: 'third',
        inputType: 'text',
        labelOnProduct: 'Engraving Text for Engagement Ring',
      },
      second: {
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
      third: {
        placeHolder: 'Engraving Text for Wedding Band',
        name: 'five',
        inputType: 'text',
        labelOnProduct: 'Engraving Text for Wedding Band',
      },
    },
  },
  signedOutSideEngraving3Letters: {
    inputNumber: 3,
    tag: ['signed-outside-engraving-three-letters'],
    name: 'signedOutSideEngraving3Letters',
    inputs: {
      first: {
        placeHolder: 'Free Outside Engraving (Optional)',
        name: 'one',
        inputType: 'checkbox',
        labelOnProduct: 'Free Outside Engraving',
      },
      second: {
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
      third: {
        placeHolder: 'Engraving Letters(up to 3)',
        name: 'third',
        inputType: 'text',
        labelOnProduct: 'Engraving Letters',
      },
    },
  },
  outSideEngraving25Letters: {
    inputNumber: 3,
    tag: ['outside-engraving-25-letters'],
    name: 'outSideEngraving25Letters',
    inputs: {
      first: {
        placeHolder: 'Free Outside Engraving (Optional)',
        name: 'one',
        inputType: 'checkbox',
        labelOnProduct: 'Free Outside Engraving',
      },
      second: {
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
      third: {
        placeHolder: 'Engraving Letters(up to 25)',
        name: 'third',
        inputType: 'text',
        labelOnProduct: 'Engraving Letters',
      },
    },
  },
  outsideEngravingZodiac: {
    inputNumber: 1,
    tag: ['single-birthstone'],
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
};
