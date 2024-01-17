import {Link, useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {json} from '@shopify/remix-oxygen';
import Conflict from '../pages/abouts/conflict-free-diamonds';
import ContactUs from '../pages/abouts/contact-us';
import OurBrand from '../pages/abouts/our-brand';
import OurValues from '../pages/abouts/our-values';
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data.blog.title} blog`}];
};

export const loader = async ({request, params, context: {storefront}}) => {
  /*  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });
 */
  if (!params.blogHandle) {
    console.log('hata11');

    throw new Response(`blog not found`, {status: 404});
  }
  console.log(params.blogHandle);
  const {blog} = await storefront.query(BLOGS_QUERY, {
    variables: {
      handle: params.blogHandle,
      /*  ...paginationVariables, */
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  return json({blog});
};

export default function Blog() {
  const {blog} = useLoaderData();
  const {articles} = blog;
  function main() {
    switch (handle) {
      case 'conflict-free-diamonds':
        return <Conflict />;
      case 'contact-us':
        return <ContactUs />;
      case 'our-brand':
        return <OurBrand />;
      case 'our-values':
        return <OurValues />;
      default:
        throw new Response('Not Found', {status: 404});
    }
  }
  return main();
}

function ArticleItem({article, loading}) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));
  return (
    <div className="blog-article" key={article.id}>
      <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
        {article.image && (
          <div className="blog-article-image">
            <Image
              alt={article.image.altText || article.title}
              aspectRatio="3/2"
              data={article.image}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        )}
        <h3>{article.title}</h3>
        <small>{publishedAt}</small>
      </Link>
    </div>
  );
}
const BLOGS_QUERY = `
query Blog($handle:String!){
  pageByHandle(handle:$handle) {
body
    id
    title
    seo {
      description
      title
    }
  }
}`;
/* 

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;
 */
