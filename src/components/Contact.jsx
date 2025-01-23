import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { AppContext } from "../App"; 

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { dark } = useContext(AppContext);

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/mrgndnbn", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setSubmitStatus('success');
        resetForm();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div 
      className={`
        min-h-[calc(100vh-70px)] 
        container 
        mx-auto 
        pt-12 
        px-4 
        ${dark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}
        transition-colors 
        duration-300
      `}
    >
      <h1 className="text-center text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="max-w-md mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className={`
                    w-full 
                    p-2 
                    rounded 
                    border 
                    ${dark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}
                  `}
                />
                <ErrorMessage 
                  name="name" 
                  component="div" 
                  className="text-red-500 text-sm mt-1" 
                />
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className={`
                    w-full 
                    p-2 
                    rounded 
                    border 
                    ${dark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}
                  `}
                />
                <ErrorMessage 
                  name="email" 
                  component="div" 
                  className="text-red-500 text-sm mt-1" 
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="message"
                  placeholder="Your Message"
                  className={`
                    w-full 
                    p-2 
                    rounded 
                    border 
                    h-32 
                    ${dark ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}
                  `}
                />
                <ErrorMessage 
                  name="message" 
                  component="div" 
                  className="text-red-500 text-sm mt-1" 
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full 
                  py-2 
                  rounded 
                  flex 
                  items-center 
                  justify-center 
                  space-x-2
                  ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
                  text-white 
                  transition-colors
                  ${isSubmitting ? 'cursor-not-allowed' : ''}
                `}
              >
                {isLoading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="flex items-center text-green-500 space-x-2 mt-4">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message sent successfully!</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center text-red-500 space-x-2 mt-4">
                  <AlertCircle className="h-5 w-5" />
                  <span>Failed to send message. Please try again.</span>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;