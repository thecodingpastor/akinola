import { useState, useContext } from "react";

import Image from "next/image";

import Button from "../../Form/Button";
import Spin from "../../UI/Spin";

import emailjs from "@emailjs/browser";

import GlobalContext from "../../../context/General/GlobalContext";

import classes from "./Contact.module.scss";
import Input from "../../Form/Input";

const Contact = () => {
  const { SetAlert } = useContext(GlobalContext);
  const [Values, setValues] = useState({
    FullName: "",
    Email: "",
    Message: "",
  });
  const [Loading, setLoading] = useState(false);

  const Valid =
    /^\S+@\S+\.\S+$/.test(Values.Email.trim()) &&
    Values.FullName.trim().length > 2 &&
    Values.Message.trim().length > 4;

  const handleChange = (e) => {
    setValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const serviceID = process.env.EMAIL_SERVICE_ID;
    const templateID = process.env.EMAIL_TEMPLATE_ID;
    const userID = process.env.EMAIL_USER_ID;
    emailjs.send(serviceID, templateID, Values, userID).then(
      (result) => {
        setLoading(false);
        setValues({ FullName: "", Email: "", Message: "" });
        SetAlert({
          type: "success",
          duration: 12000,
          title: "Message sent successfully",
          message:
            "Your message has been sent to the admin. You will be contacted, if need be, via the email address you provided",
        });
      },
      (error) => {
        setLoading(false);
        SetAlert({
          type: "error",
          duration: 12000,
          title: "Something went wrong.",
          message: error.text,
        });
      }
    );
  };

  return (
    <div className={classes.Container} id="contact">
      <h3>Let&apos;s have a chat</h3>
      <div className={classes.Contact}>
        <form onSubmit={onSubmit} className={classes.ContactForm}>
          <h4 className="text-center">
            I will get back to you between 2 - 48 hours
          </h4>

          <Input
            name="FullName"
            id="FullName"
            placeholder="Your Full Name"
            required
            onChange={handleChange}
            value={Values.FullName}
            label="Full Name: 3 or more characters"
          />
          <Input
            type="email"
            name="Email"
            id="Email"
            required
            placeholder="Email"
            onChange={handleChange}
            value={Values.Email}
            label="Email: Must be a valid email"
          />

          <Input
            element="textarea"
            name="Message"
            placeholder="Your message"
            value={Values.Message}
            onChange={handleChange}
            label="Message: 5 or more characters"
          />
          {Valid ? (
            <div className="flex-center">
              {!Loading ? (
                <Button text="Send Message" type="submit" fade />
              ) : (
                <Spin />
              )}
            </div>
          ) : (
            <p className="text-center fade_in">
              Fill in the right details to see submit button
            </p>
          )}
        </form>
        <div className={classes.ContactImage}>
          <Image
            src="/images/customer-service.png"
            width="400"
            height="400"
            alt="contact-image"
            blurDataURL="/images/question.jpg"
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
