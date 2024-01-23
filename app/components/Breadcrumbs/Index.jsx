import {Link} from '@remix-run/react';

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
      <nav className="flex flex-row font-avenir-medium gap-1 overflow-hidden">
        {product !== null ? (
          <>
            <Link
              className="font-avenir-medium hover:underline-offset-4"
              to="/"
            >
              Home
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link
              className="font-avenir-medium hover:underline-offset-4"
              to={'/collections/' + product.collections.nodes[0].handle}
            >
              {product.collections.nodes[0].title?.split(' ')[0]}
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>

            <Link className="font-avenir-medium hover:underline-offset-4 max-md:whitespace-nowrap text-ellipsis overflow-hidden	 ">
              {product.title.split(' ')[0]}
            </Link>
          </>
        ) : (
          ''
        )}
      </nav>
    </div>
  );
}
