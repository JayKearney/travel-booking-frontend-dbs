import React from "react";
import CommonHeading from "../common/CommonHeading";
import { services } from "../data/Data"; // Import services data

export default function Services() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        {/* Common heading for the services section */}
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <CommonHeading
            heading="Our Services"
            title="Services"
            subtitle="Explore Our"
          />
        </div>
        <div className="row g-4">
          {/* Map through the services data to display each service */}
          {services.map((item, index) => (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
              <a className="service-item rounded" href="">
                {/* Service icon and details */}
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    {item.icon}
                  </div>
                </div>
                <h5 className="mb-3">{item.name}</h5>
                <p className="text-body mb-0">{item.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
