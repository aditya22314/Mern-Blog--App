import { Button } from "flowbite-react";

const CalltoAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">
          Want to Learn more about JS ?
          <p className="text-gray-500 my-2">
            Checkout these resoures with 100 JS Projects
          </p>
          <Button
            gradientDuoTone={"purpleToPink"}
            className="rounded-tl-xl rounded-bl-none"
          >
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              100 JS PROJECTS
            </a>
          </Button>
        </h2>
      </div>
      <div className="p-7">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShd7rqYDVmv8tDkFPNP2UQrzzANkLB8DUYpVf_IazK8g&s" />
      </div>
    </div>
  );
};

export default CalltoAction;
