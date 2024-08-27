import NewDuo from "./components/new-duo";
import ProfileInfo from "./components/profile-info";

/* eslint-disable react/prop-types */
function ContactsContainer() {
  return (
    <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#000000] border-r-2 border-[#ffffff] w-full">
      <div className="pt-3 flex text-center justify-center">
        <div className="flex text-2xl items-center justify-center font-bold">
          greetings.
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="duos." />
          <NewDuo />
        </div>
      </div>
      <div className="my-5">
        <div className="flex items-center justify-between pr-10">
          <Title text="gatherings." />
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
}

const Title = ({ text }) => {
  return (
    <h6 className="tracking-widest text-neutral-400 pl-10 font-medium text-opacity-90 text-sm">
      {text}
    </h6>
  );
};

export default ContactsContainer;
