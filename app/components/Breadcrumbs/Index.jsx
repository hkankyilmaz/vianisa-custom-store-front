import * as React from 'react';
import {Link} from '@remix-run/react';
import {rules} from 'app/constant/breadcrumb_rules.js';
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({className, product}) {
  console.log(rules);
  console.log(product);
  let selected = new Object();
  selected = product.collections.nodes.map((coll) =>
    rules.find((rule) => rule.handle == coll.handle),
  );
  // let selected = rules.find((item) => item.handle==);
  return (
    <div role="presentation" className={className} onClick={handleClick}>
      <nav className="flex flex-row font-body gap-1 overflow-hidden">
        <Link className="font-body hover:underline-offset-4" to="/">
          Home
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>
        {/* {selected !== null
          ? selected.routes.map((roo) => (
              <Link
                className="font-body hover:underline-offset-4"
                to={roo.routes + product.collections.nodes[0].handle}
              >
                {product.collections.nodes[0].title?.split(' ')[0]}
              </Link>
            ))
          : ''} */}
        {/*  <Link
          className="font-body hover:underline-offset-4"
          to={'/collections/' + product.collections.nodes[0].handle}
        >
          {product.collections.nodes[0].title?.split(' ')[0]}
        </Link> */}
        <span className="breadcrumb-arrow">&gt;</span>

        <Link className="font-body hover:underline-offset-4 max-md:whitespace-nowrap text-ellipsis overflow-hidden	 ">
          {product.title.split(' ')[0]}
        </Link>
      </nav>
    </div>
  );
}
