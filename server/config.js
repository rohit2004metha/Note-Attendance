const bgColors = {
  maroon: { red: 0.8666667, green: 0.49411765, blue: 0.41960785 },
  red: { red: 0.91764706, green: 0.6, blue: 0.6 },
  orange: { red: 0.9764706, green: 0.79607844, blue: 0.6117647 },
  yellow: { red: 1, green: 0.8980392, blue: 0.6 },
  green: { red: 0.7137255, green: 0.84313726, blue: 0.65882355 },
  darkgreen: { red: 0.63529414, green: 0.76862746, blue: 0.7882353 },
  blue: { red: 0.6431373, green: 0.7607843, blue: 0.95686275 },
  cyan: { red: 0.62352943, green: 0.77254903, blue: 0.9098039 },
  purple: { red: 0.7058824, green: 0.654902, blue: 0.8392157 },
  pink: { red: 0.8352941, green: 0.6509804, blue: 0.7411765 }
}

const config = {
  TE: {
    A: {
      sheetId: '1DmMUy2iOBW_ygD6pJ53AlKds7-G3q_Z08-ks7cMizV4',
      lastRoll: 79,
      theory: ['CN', 'DBMS', 'SPOS', 'TOC'],
      labs: ['CNSL', 'DBMSL', 'LP1'],
      disabled: ["TCOA11"],
      batches: {
        "1": {
          start: 1,
          end: 26,
        },
        "2": {
          start: 27,
          end: 52,
        },
        "3": {
          start: 53,
          end: 79,
        },
      },
      hasElectives: true,
      electiveSheetName: 'EL1',
      electives: [
        {
          name: 'HCI'
        },
        {
          name: 'SPM'
        },
        {
          name: 'IOT'
        }
      ]
    },
    B: {
      sheetId: '1IouuSBaV6m_MqVYNjNPG47wK7q3p6HzSjY1n2w9yjIg',
      lastRoll: 79,
      theory: ['CN', 'DBMS', 'SPOS', 'TOC'],
      labs: ['CNSL', 'DBMSL', 'LP1'],
      disabled: [],
      batches: {
        "1": {
          start: 1,
          end: 26,
        },
        "2": {
          start: 27,
          end: 52,
        },
        "3": {
          start: 53,
          end: 79,
        },
      },
      hasElectives: true,
      electiveSheetName: 'EL1',
      electives: [
        {
          name: 'HCI'
        },
        {
          name: 'SPM'
        },
        {
          name: 'IOT'
        }
      ]
    },
    C: {
      sheetId: '1XGyMB3WU33rLjlkxkFHQ1dR04RnR_6H0U3dI-0kBdzQ',
      lastRoll: 76,
      theory: ['CN', 'DBMS', 'SPOS', 'TOC'],
      labs: ['CNSL', 'DBMSL', 'LP1'],
      disabled: [],
      batches: {
        "1": {
          start: 1,
          end: 25,
        },
        "2": {
          start: 26,
          end: 50,
        },
        "3": {
          start: 51,
          end: 76,
        },
      },
      hasElectives: true,
      electiveSheetName: 'EL1',
      electives: [
        {
          name: 'HCI'
        },
        {
          name: 'SPM'
        },
        {
          name: 'IOT'
        }
      ]
    },
    D: {
      sheetId: '1pMuCavfsLGb1gmuOa599pNyvZhVtod_M8JowHDLNGQs',
      lastRoll: 79,
      theory: ['CN', 'DBMS', 'SPOS', 'TOC'],
      labs: ['CNSL', 'DBMSL', 'LP1'],
      disabled: [],
      batches: {
        "1": {
          start: 1,
          end: 26,
        },
        "2": {
          start: 27,
          end: 52,
        },
        "3": {
          start: 53,
          end: 79,
        },
      },
      hasElectives: true,
      electiveSheetName: 'EL1',
      electives: [
        {
          name: 'HCI'
        },
        {
          name: 'SPM'
        },
        {
          name: 'IOT'
        }
      ]
    },
  },
  SE: {
    A: {
      sheetId: '1nFdCP-9LWDASc1rA-LbDRDDgrJLs5-DgGtwctMhwWws',
      lastRoll: 71,
      theory: ['CG', 'DM', 'FDS', 'HSS', 'OOP', 'DELD'],
      labs: ['BCSL', 'DEL', 'DSL', 'OOPCGL'],
      disabled: [],
      batches: {
        "1": {
          start: 1,
          end: 25,
        },
        "2": {
          start: 26,
          end: 50,
        },
        "3": {
          start: 51,
          end: 71,
        },
      },
      hasElectives: false,
      electiveSheetName: '',
      electives: []
    },
    B: {
      sheetId: '1b4XC1kNlOss1Qqzg7XpCTJ18Oy2yuPdnTfbKXYxeA4c',
      lastRoll: 71,
      theory: ['CG', 'DM', 'FDS', 'HSS', 'OOP', 'DELD'],
      labs: ['BCSL', 'DEL', 'DSL', 'OOPCGL'],
      disabled: [],
      batches: {
        "1": {
          start: 1,
          end: 25,
        },
        "2": {
          start: 26,
          end: 50,
        },
        "3": {
          start: 51,
          end: 71,
        },
      },
      hasElectives: false,
      electiveSheetName: '',
      electives: []
    },
    C: {
      sheetId: '1vPPNshg04YW7-7TXPdtggEzIN4Oi1wcJblbyBG7XuxQ',
      lastRoll: 71,
      theory: ['CG', 'DM', 'FDS', 'HSS', 'OOP', 'DELD'],
      labs: ['BCSL', 'DEL', 'DSL', 'OOPCGL'],
      disabled: [],
      batches: {
        "1": {
          start: 1,
          end: 25,
        },
        "2": {
          start: 26,
          end: 50,
        },
        "3": {
          start: 51,
          end: 71,
        },
      },
      hasElectives: false,
      electiveSheetName: '',
      electives: []
    },
    D: {
      sheetId: '1UvaU2YY_OB3Rw-8FXpKlG452iLrc45VH-YuxBMfYjF4',
      lastRoll: 70,
      theory: ['CG', 'DM', 'FDS', 'HSS', 'OOP', 'DELD'],
      labs: ['BCSL', 'DEL', 'DSL', 'OOPCGL'],
      disabled: [],
      batches: {
        "1": {
          start: 1,
          end: 25,
        },
        "2": {
          start: 26,
          end: 50,
        },
        "3": {
          start: 51,
          end: 70,
        },
      },
      hasElectives: false,
      electiveSheetName: '',
      electives: []
    },
  }
}

module.exports = { config: config }