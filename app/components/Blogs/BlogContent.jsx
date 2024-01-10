import {Divider} from '@mui/material';
import {Image} from '@shopify/hydrogen';

const NonBreakingSpace = '\u00A0';

const BlogContent = ({
  content,
  classNames = {
    title: '',
    largeTitle: '',
    xLargeTitle: '',
    text: '',
    image: '',
    imageWrapper: '',
    list: '',
    listItem: '',
    divider: '',
    space: '',
  },
}) => {
  return (
    <>
      {content.map((item, i) => {
        if (item.type == 'title') {
          return (
            <h3
              key={i}
              className={`font-optima font-semibold text-[13px] mb-[var(--blog-default-spacing)] ${
                classNames.title
              } ${item.className ?? ''}}`}
            >
              {item.content}
            </h3>
          );
        }

        if (item.type == 'largeTitle') {
          return (
            <h4
              key={i}
              className={`font-optima text-[16px] sm:text-[18px] uppercase mt-[2.2em] mb-[1.2em] ${
                classNames.largeTitle
              } ${item.className ?? ''}}`}
            >
              {item.content}
            </h4>
          );
        }

        if (item.type == 'xLargeTitle') {
          return (
            <h3
              key={i}
              className={`font-optima text-[20px] uppercase mt-[2.2em] mb-[0.8em] ${
                classNames.xLargeTitle
              } ${item.className ?? ''}}`}
            >
              {item.content}
            </h3>
          );
        }

        if (item.type == 'list') {
          return (
            <ul
              key={i}
              className={`ml-[30px] mb-[var(--blog-default-spacing)] ${
                classNames.list
              } ${item.classNames ? item.classNames.list ?? '' : ''}`}
            >
              {item.content.map((listItem, j) => (
                <li
                  key={`${i}-${j}`}
                  className={`font-body text-[13px] py-[5px] ${
                    classNames.listItem ?? ''
                  }`}
                >
                  {listItem}
                </li>
              ))}
            </ul>
          );
        }

        if (item.type == 'text') {
          return (
            <>
              {item.content.map((contentItem, j) => {
                return (
                  <p
                    key={`${i}-${j}`}
                    className={`font-body text-[13px] mb-[var(--blog-default-spacing)] ${
                      classNames.text
                    } ${item.className ?? ''}`}
                  >
                    {contentItem}
                  </p>
                );
              })}
            </>
          );
        }

        if (item.type == 'image') {
          return (
            <div
              key={i}
              className={`flex flex-col items-center text-[13px] ${
                classNames.imageWrapper
              } ${item.classNames ? item.classNames.wrapper ?? '' : ''}`}
            >
              <Image
                className={`my-[3em] ${classNames.image} ${
                  item.className ?? ''
                } ${item.classNames ? item.classNames.image ?? '' : ''}`}
                width={item.content.width}
                height={item.content.height}
                src={item.content.src}
                alt={item.content.alt}
              />
            </div>
          );
        }

        if (item.type == 'divider') {
          return (
            <Divider
              key={i}
              className={`${classNames.divider} ${item.className ?? ''}`}
            />
          );
        }

        if (item.type == 'space') {
          return (
            <p
              key={i}
              className={`mb-[var(--blog-default-spacing)] ${
                classNames.space
              } ${item.className ?? ''}`}
            >
              {NonBreakingSpace}
            </p>
          );
        }
      })}
    </>
  );
};

export default BlogContent;
