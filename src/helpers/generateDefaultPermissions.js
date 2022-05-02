const generateDefaultPermissions = () => [
  {
    active: false,
    title: 'Permission group 1',
    id: 1,
    subPermissions: [
      {
        id: 11,
        title: 'Permission 11',
        active: true,
      },
      {
        id: 12,
        title: 'Permission 12',
        active: true,
      },
      {
        id: 13,
        title: 'Permission 13',
        active: false,
      },
      {
        id: 14,
        title: 'Permission 14',
        active: true,
      },
      {
        id: 15,
        title: 'Permission 15',
        active: true,
      },
    ],
  },
  {
    active: false,
    title: 'Permission group 2',
    id: 2,
    subPermissions: [
      {
        id: 21,
        title: 'Permission 21',
        active: true,
      },
      {
        id: 22,
        title: 'Permission 22',
        active: true,
      },
      {
        id: 23,
        title: 'Permission 23',
        active: true,
      },
    ],
  },
  {
    active: false,
    title: 'Permission group 3',
    id: 3,
    subPermissions: [
      {
        id: 31,
        title: 'Permission 31',
        active: true,
      },
      {
        id: 32,
        title: 'Permission 32',
        active: true,
      },
      {
        id: 33,
        title: 'Permission 33',
        active: false,
      },
      {
        id: 34,
        title: 'Permission 34',
        active: false,
      },
    ],
  },
];

export default generateDefaultPermissions
