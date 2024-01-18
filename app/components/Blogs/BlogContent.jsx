import {Divider} from '@mui/material';
import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import React from 'react';
import {trim} from '~/utils';
import Table from './Table';

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
    combinedTextWrapper: '',
    link: '',
  },
}) => {
  return (
    <>
      {content.map((item, i) => {
        if (item.type == 'title') {
          return (
            <DynamicTitle
              key={i}
              tag={item.tag ?? 'h2'}
              className={trim(
                `font-optima-medium text-[13px] mb-[var(--blog-default-spacing)] ${
                  classNames.title
                } ${item.className ?? ''}`,
              )}
            >
              {item.content}
            </DynamicTitle>
          );
        }

        if (item.type == 'largeTitle') {
          return (
            <DynamicTitle
              key={i}
              tag={item.tag ?? 'h2'}
              className={trim(
                `font-optima-normal text-[16px] sm:text-[18px] uppercase mt-[2.2em] mb-[1.2em] ${
                  classNames.largeTitle
                } ${item.className ?? ''}`,
              )}
            >
              {item.content}
            </DynamicTitle>
          );
        }

        if (item.type == 'xLargeTitle') {
          return (
            <DynamicTitle
              key={i}
              tag={item.tag ?? 'h2'}
              className={trim(
                `font-optima-normal text-[20px] uppercase mt-[2.2em] mb-[0.8em] ${
                  classNames.xLargeTitle
                } ${item.className ?? ''}`,
              )}
            >
              {item.content}
            </DynamicTitle>
          );
        }

        if (item.type == 'list') {
          return (
            <ul
              key={i}
              className={trim(
                `ml-[30px] mb-[var(--blog-default-spacing)] ${
                  classNames.list
                } ${item.classNames ? item.classNames.list ?? '' : ''}`,
              )}
            >
              {item.content.map((listItem, j) => {
                if (typeof listItem == 'object') {
                  return (
                    <li
                      key={`${i}-${j}`}
                      className={trim(
                        `py-[5px] ${classNames.listItem ?? ''} ${
                          item.classNames ? item.classNames.listItem ?? '' : ''
                        }`,
                      )}
                    >
                      <BlogContent content={[listItem]} />
                    </li>
                  );
                }
                return (
                  <li
                    key={`${i}-${j}`}
                    className={trim(
                      `py-[5px] ${classNames.listItem ?? ''} ${
                        item.classNames ? item.classNames.listItem ?? '' : ''
                      }`,
                    )}
                  >
                    {listItem}
                  </li>
                );
              })}
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
                    className={trim(
                      `mb-[var(--blog-default-spacing)] ${classNames.text} ${
                        item.className ?? ''
                      }`,
                    )}
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
              className={trim(
                `flex flex-col items-center text-[13px] ${
                  classNames.imageWrapper
                } ${item.classNames ? item.classNames.wrapper ?? '' : ''}`,
              )}
            >
              <Image
                key={`${i}-image`}
                className={trim(
                  `my-[3em] ${classNames.image} ${item.className ?? ''} ${
                    item.classNames ? item.classNames.image ?? '' : ''
                  }`,
                )}
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
              className={trim(`${classNames.divider} ${item.className ?? ''}`)}
            />
          );
        }

        if (item.type == 'space') {
          return (
            <p
              key={i}
              className={trim(
                `mb-[var(--blog-default-spacing)] ${classNames.space} ${
                  item.className ?? ''
                }`,
              )}
            >
              {NonBreakingSpace}
            </p>
          );
        }

        if (item.type == 'combinedText') {
          return (
            <p
              key={i}
              className={trim(
                `mb-[var(--blog-default-spacing)] ${
                  classNames.combinedTextWrapper
                } ${item.classNames ? item.classNames.wrapper ?? '' : ''}`,
              )}
            >
              {item.content.map((contentItem, j) => {
                if (typeof contentItem == 'object') {
                  return (
                    <BlogContent key={`${i}-${j}`} content={[contentItem]} />
                  );
                }
                return (
                  <span
                    key={`${i}-${j}`}
                    className={trim(
                      `text-[13px] ${classNames.text} ${
                        item.classNames ? item.classNames.text ?? '' : ''
                      }`,
                    )}
                  >
                    {contentItem}
                  </span>
                );
              })}
            </p>
          );
        }

        if (item.type == 'link') {
          return (
            <Link
              key={i}
              to={item.content.href}
              target={item.content.target ?? '_self'}
              className={trim(
                `mb-[var(--blog-default-spacing)] text-[13px] underline ${
                  classNames.link
                } ${item.className ?? ''}`,
              )}
            >
              {item.content.text}
            </Link>
          );
        }

        if (item.type == 'table') {
          return (
            <Table
              key={i}
              columnTitles={item.content.columnTitles}
              data={item.content.data}
              cellAlign={item.content.cellAlign}
              titleAlign={item.content.titleAlign}
              classNames={item.content.classNames}
            />
          );
        }
      })}
    </>
  );
};

const DynamicTitle = ({tag, children, ...props}) => {
  return React.createElement(tag, props, children);
};

export default BlogContent;
