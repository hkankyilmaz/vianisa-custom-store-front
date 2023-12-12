import * as React from 'react';
import {Link} from '@remix-run/react';
import {useState} from 'react';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({className, product}) {
  console.log(product);
  const [xx, setxx] = useState('');
  return (
    <div role="presentation" className={className} onClick={handleClick}>
      <nav className="flex flex-row font-body gap-1">
        <Link className="font-body" to="/">
          Home
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>
        <Link
          className="font-body"
          to={'/collections/' + product.collections.nodes[0].handle}
        >
          {product.collections.nodes[0].title}
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>

        <Link className="font-body">{product.title}</Link>
      </nav>
    </div>
  );
}
