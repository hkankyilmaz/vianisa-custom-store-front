import {
  BlogSchema,
  FloatingLabelInput,
  FloatingLabelTextArea,
} from '~/components/Blogs';

export default function Blog() {
  return (
    <BlogSchema title="Contact" classNames={{body: 'max-w-[680px]'}}>
      <div className="flex flex-col gap-[15px]">
        <div className="flex flex-col sm:flex-row gap-[15px]">
          <FloatingLabelInput label="Your name" className="blog-input" />
          <FloatingLabelInput label="Your email" className="blog-input" />
        </div>
        <FloatingLabelTextArea
          label="Your message"
          className="blog-textarea"
          rows="10"
          cols="30"
          style={{resize: 'none'}}
        />
        <button type="button" className="btn-primary mt-[5px]">
          Send Message
        </button>
      </div>
    </BlogSchema>
  );
}
