import {Link} from '@remix-run/react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center my-[250px]">
      <p className="text-[#2f2f2f] font-bold tracking-[2.6px]">404</p>
      <p className="text-[#2f2f2f]">
        The page you are looking for cannot be found.
      </p>
      <Link
        prefetch="intent"
        to={'/'}
        className="uppercase text-[#2f2f2f] mt-5 inline-block text-[var(--feat-col-prod-btn-fg)] bg-[var(--feat-col-prod-btn-bg)] border border-solid border-[var(--feat-col-prod-btn-bg)] text-[11px] font-montserratMd tracking-[.2em] transition-all ease-css-ease duration-[.35s] hover:text-[var(--feat-col-prod-btn-fg-hover)] hover:bg-[var(--feat-col-prod-btn-bg-hover)] py-[14px] px-[28px] leading-[normal]"
      >
        Back To Homepage
      </Link>
    </div>
  );
}

export default NotFound;
