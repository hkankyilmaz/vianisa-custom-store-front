import * as React from 'react';
import {Link} from '@remix-run/react';
import {rules} from 'app/constant/breadcrumb_rules.js';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BasicBreadcrumbs({className, product}) {
  /*  const [sel, setsel] = useState([]);
  let selected;
  useEffect(() => {
    rules.map((itt) =>
      setsel(
        product.collections.nodes.find((item) => item.handle == itt.handle),
      ),
    );
  }, []);

  console.log(selected[0], typeof selected);
 */
  // let selected = rules.find((item) => item.handle==);
  return (
    <div role="presentation" className={className} onClick={handleClick}>
      <nav className="flex flex-row font-body gap-1 overflow-hidden">
        <Link className="font-body hover:underline-offset-4" to="/">
          Home
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>
        {/* {selected[0] ? (
          <Link
            className="font-body hover:underline-offset-4"
            to={
              '/' +
              selected[0].routes[0]?.route_base +
              selected[0].routes[0]?.route
            }
          >
            {selected[0].routes[0]?.title}
          </Link>
        ) : (
          ''
        )} */}
        <Link
          className="font-body hover:underline-offset-4"
          to={'/collections/' + product.collections.nodes[0].handle}
        >
          {product.collections.nodes[0].title?.split(' ')[0]}
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>

        <Link className="font-body hover:underline-offset-4 max-md:whitespace-nowrap text-ellipsis overflow-hidden	 ">
          {product.title.split(' ')[0]}
        </Link>
      </nav>
    </div>
  );
}
