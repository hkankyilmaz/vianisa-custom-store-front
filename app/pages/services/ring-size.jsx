import {BlogContent, BlogSchema} from '~/components/Blogs';

export default function Blog() {
  const content = [
    {
      type: 'table',
      content: {
        columnTitles: [
          {text: 'Circumference (in)', superText: '*'},
          {text: 'Circumference (mm)', superText: '**'},
          {text: 'Diameter (mm)', superText: '***'},
          'US & Canada',
          'Europe',
          'UK & Australia',
          'Japan & Singapore',
        ],
        data: [
          [1.74, 44.3, 14, 3, 44, 'F 1/2', 4],
          [1.77, 44.9, 14.3, 3.3, 45, 'G', 5],
          [1.79, 45.6, 14.5, 3.5, null, 'G 1/2', null],
          [1.82, 46.2, 14.7, 3.8, 46, 'H', 6],
          [1.84, 46.8, 14.9, 4, 47, 'H 1/2', 7],
          [1.87, 47.4, 15.1, 4.3, null, 'I', null],
          [1.89, 48.1, 15.3, 4.5, 48, 'I 1/2', 8],
          [1.92, 48.7, 15.5, 4.8, null, 'J', null],
          [1.94, 49.3, 15.7, 5, 49, 'J 1/2', 9],
          [1.97, 50.0, 15.9, 5.3, 50, 'K', null],
          [1.99, 50.6, 16.1, 5.5, null, 'K 1/2', 10],
          [2.02, 51.2, 16.3, 5.8, 51, 'L', null],
          [2.04, 51.8, 16.5, 6, 52, 'L 1/2', 11],
          [2.07, 52.5, 16.7, 6.3, null, 'M', 12],
          [2.09, 53.1, 16.9, 6.5, 53, 'M 1/2', 13],
          [2.12, 53.7, 17.1, 6.8, null, 'N', null],
          [2.14, 54.3, 17.3, 7, 54, 'N 1/2', 14],
          [2.16, 55.0, 17.5, 7.3, 55, 'O', null],
          [2.19, 55.6, 17.7, 7.5, null, 'O 1/2', 15],
          [2.21, 56.2, 17.9, 7.8, 56, 'P', null],
          [2.24, 56.9, 18.1, 8, 57, 'P 1/2', 16],
          [2.26, 57.5, 18.3, 8.3, null, 'Q', null],
          [2.29, 58.1, 18.5, 8.5, 58, 'Q 1/2', 17],
          [2.33, 59.1, 18.8, 8.8, 59, 'R', null],
          [2.35, 59.7, 19, 9, null, 'R 1/2', 18],
          [2.37, 60.3, 19.2, 9.3, 60, 'S', null],
          [2.4, 60.9, 19.4, 9.5, 61, 'S 1/2', 19],
          [2.42, 61.6, 19.6, 9.8, null, 'T', null],
          [2.45, 62.2, 19.8, 10, 62, 'T 1/2', 20],
          [2.47, 62.8, 20, 10.3, null, 'U', 21],
          [2.5, 63.5, 20.2, 10.5, 63, 'U 1/2', 22],
          [2.52, 64.1, 20.4, 10.8, 64, 'V', null],
          [2.55, 64.7, 20.6, 11, null, 'V 1/2', 23],
          [2.57, 65.3, 20.8, 11.3, 65, 'W', null],
          [2.6, 66.0, 21, 11.5, 66, 'W 1/2', 24],
          [2.62, 66.6, 21.2, 11.8, null, 'X', null],
          [2.65, 67.2, 21.4, 12, 67, 'X 1/2', 25],
          [2.67, 67.9, 21.6, 12.3, null, 'Y', null],
          [2.7, 68.5, 21.8, 12.5, 68, 'Z', 26],
          [2.72, 69.1, 22, 12.8, 69, 'Z 1/2', null],
          [2.75, 69.7, 22.2, 13, 70, null, 27],
          [2.77, 70.4, 22.4, 13.3, null, 'Z+1', null],
          [2.8, 71.0, 22.6, 13.5, null, 'Z+2', null],
        ],
        cellAlign: 'center',
        titleAlign: 'center',
      },
    },
    {
      type: 'text',
      content: [
        "* 'Circumference' refers to the ring's inside circumference, measured in inches.",
        "** 'Circumference' refers to the ring's inside circumference, measured in millimeters.",
        "*** 'Diameter' refers to the ring's inside diameter, measured in millimeters.",
      ],
      className: '!mb-0 first-of-type:!mt-8 !py-[5px]',
    },
  ];
  return (
    <BlogSchema
      title="ring size conversion chart"
      classNames={{body: 'overflow-x-visible'}}
    >
      <BlogContent content={content} />
    </BlogSchema>
  );
}
