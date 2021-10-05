import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "gatsby";
import { Switch } from "@headlessui/react";
import Layout from "../components/layout";
import Seo from "../components/seo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Contact = () => {
  const [agreed, setAgreed] = useState(false);

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  return (
    <Layout>
      <Seo title="Contact" />
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          <svg
            className="absolute left-full transform translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <svg
            className="absolute right-full bottom-0 transform -translate-x-1/2"
            width={404}
            height={404}
            fill="none"
            viewBox="0 0 404 404"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="85737c0e-0916-41d7-917f-596dc7edfa27"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={404}
              fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
            />
          </svg>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Contact
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-500">
              Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
              massa dictumst amet. Sapien tortor lacus arcu.
            </p>
          </div>
          <div className="mt-12">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                budget: "",
                message: "",
              }}
              onSubmit={(values, actions) => {
                fetch("/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: encode({ "form-name": "contact", ...values }),
                })
                  .then(() => {
                    alert("Success");
                    actions.resetForm();
                  })
                  .catch(() => {
                    alert("Error");
                  })
                  .finally(() => actions.setSubmitting(false));
              }}
              validate={values => {
                const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                const errors = {};
                if (!values.firstName) {
                  errors.firstName = "First Name Required";
                }
                if (!values.lastName) {
                  errors.lastName = "Last Name Required";
                }
                if (!values.budget) {
                  errors.budget = "Select Budget";
                }
                if (!values.email || !emailRegex.test(values.email)) {
                  errors.email = "Valid Email Required";
                }
                if (!values.message) {
                  errors.message = "Message Required";
                }
                return errors;
              }}
            >
              <Form
                name="contact"
                data-netlify={true}
                className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <Field
                      id="firstName"
                      name="firstName"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="firstName" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <Field
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="lastName" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <legend className="block text-sm font-medium text-gray-700">
                    Expected budget
                  </legend>
                  <div className="mt-4 grid grid-cols-1 gap-y-4">
                    <div className="flex items-center">
                      <Field
                        id="budget-under-25k"
                        name="budget"
                        value="under 25k"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="budget-under-25k" className="ml-3">
                        <span className="block text-sm text-gray-700">
                          Less than $25K
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Field
                        id="budget-25k-50k"
                        name="budget"
                        value="25k-50k"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="budget-25k-50k" className="ml-3">
                        <span className="block text-sm text-gray-700">
                          $25K – $50K
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Field
                        id="budget-50k-100k"
                        name="budget"
                        value="50k-100k"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="budget-50k-100k" className="ml-3">
                        <span className="block text-sm text-gray-700">
                          $50K – $100K
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Field
                        id="budget-over-100k"
                        name="budget"
                        value="over 100k"
                        type="radio"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="budget-over-100k" className="ml-3">
                        <span className="block text-sm text-gray-700">
                          $100K+
                        </span>
                      </label>
                    </div>
                    <ErrorMessage name="budget" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <div className="mt-1">
                    <Field
                      id="message"
                      name="message"
                      component="textarea"
                      className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                    />
                    <ErrorMessage name="message" />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Switch
                        checked={agreed}
                        onChange={setAgreed}
                        className={classNames(
                          agreed ? "bg-indigo-600" : "bg-gray-200",
                          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        )}
                      >
                        <span className="sr-only">Agree to policies</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            agreed ? "translate-x-5" : "translate-x-0",
                            "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                          )}
                        />
                      </Switch>
                    </div>
                    <div className="ml-3">
                      <p className="text-base text-gray-500">
                        By selecting this, you agree to the{" "}
                        <Link
                          to="/"
                          className="font-medium text-gray-700 underline"
                        >
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/"
                          className="font-medium text-gray-700 underline"
                        >
                          Cookie Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Let's talk
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
