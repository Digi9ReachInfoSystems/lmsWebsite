import React, { useEffect } from "react";
import {
  RefundContainer,
  RefundTitle,
  RefundSubtitle,
  RefundParagraph,
  RefundOrderedList,
  RefundList,
  Refund,
} from "./RefundCancellationPolicy.style";
import Header from "../../Main/Pages/NavBar/navbar";
import Footer from "../../Main/Pages/Footer/Footer";

const RefundCancellationPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Refund>
        <RefundTitle>REFUND AND CANCELLATION POLICY</RefundTitle>
      </Refund>
      <RefundContainer>
        <RefundParagraph>
          Welcome to The Topper Academy! We strive to provide high-quality
          online education to support students in their learning journey. This
          Refund and Cancellation Policy outlines the terms under which refunds
          may be considered, and the conditions applicable to cancellations of
          services. By enrolling in our courses or using our services, you agree
          to the terms outlined in this policy.
        </RefundParagraph>
        <RefundParagraph>
          At the Website and Application, Our Refund and Cancellation Policy is
          designed to be fair and transparent to ensure customer satisfaction.
          Please read the policy below for details regarding refunds and
          cancellations:
        </RefundParagraph>
        <div style={{ margin: "30px 0" }}>
          <RefundSubtitle>1. No-Refund Policy:</RefundSubtitle>
          <RefundParagraph>
            The Topper Academy operates under a strict no-refund policy for all
            courses, subscriptions, and educational services provided on our
            platform. Once a student enrols and payment has been made, fees are
            generally non-refundable.
          </RefundParagraph>
        </div>
        <div style={{ margin: "30px 0" }}>
          <RefundSubtitle>
            2. Exceptional Circumstances for Refunds:
          </RefundSubtitle>
          <RefundParagraph>
            In rare and exceptional cases, refunds may be considered, solely
            depending on the higher management’s decision, if:
          </RefundParagraph>
          <RefundOrderedList>
            <RefundList>
              The student demonstrates an inability to keep pace with the
              curriculum despite reasonable effort and support.
            </RefundList>
            <RefundList>
              The issue is raised after a certain duration from the start of the
              program, allowing an adequate assessment of the student’s ability
              to cope with the course material.
            </RefundList>
          </RefundOrderedList>
        </div>

        <div style={{ margin: "30px 0" }}>
          <RefundSubtitle>3. Process for Refund Requests:</RefundSubtitle>
          <RefundParagraph>
            In the event a refund is sought under exceptional circumstances, the
            following process will apply:
          </RefundParagraph>
          <RefundOrderedList>
            <RefundList>
              A consultation meeting will be scheduled with the student’s
              parent(s) or guardian(s) to discuss the student’s progress,
              challenges faced, and options for continued support.
            </RefundList>
            <RefundList>
              The Topper Academy will evaluate the student’s case on a
              discretionary basis, taking into account the duration of the
              course completed, the level of engagement, and the reasons for the
              refund request.
            </RefundList>
            <RefundList>
              If a refund is approved, it will be calculated based on the
              remaining portion of the program’s fees, after deducting an
              administrative fee and charges for the portion of the course
              already completed.
            </RefundList>
          </RefundOrderedList>
        </div>

        <div style={{ margin: "30px 0" }}>
          <RefundSubtitle>4. Conditions and Limitations:</RefundSubtitle>
          <RefundParagraph>
            Refunds, if granted, are subject to the following conditions
            depending on various factors:
          </RefundParagraph>
          <RefundOrderedList>
            <RefundList>
              The refund request must be raised by the parent or guardian within
              5 days of the student’s enrolment or after at least 5 months of
              student’s enrolment.
            </RefundList>
            <RefundList>
              The student must demonstrate consistent efforts to participate in
              classes, complete assignments, and engage with educational
              materials provided by The Topper Academy.
            </RefundList>
            <RefundList>
              Refunds are not applicable for students who fail to meet minimum
              attendance requirements or whose accounts are found in violation
              of our platform’s terms of service.
            </RefundList>
            <RefundList>
              Any decision regarding refunds is final and binding and rests
              solely at the discretion of The Topper Academy.
            </RefundList>
          </RefundOrderedList>
        </div>
        <div style={{ margin: "30px 0" }}>
          <RefundSubtitle>
            5. No Refund for Cancellations Due to Personal Reasons:
          </RefundSubtitle>
          <RefundParagraph>
            Refunds are not available for cancellations initiated due to
            personal reasons, including but not limited to changes in schedule,
            personal preferences, or alternate study plans.
          </RefundParagraph>
        </div>
        <div style={{ margin: "30px 0" }}>
          <RefundSubtitle>
            6. Modifications to the Refund Policy:
          </RefundSubtitle>
          <RefundParagraph>
            The Topper Academy reserves the right to amend this Refund and
            Cancellation Policy at any time. Any modifications to the policy
            will be updated on our website and application, and it is the
            responsibility of users to review the terms periodically.
          </RefundParagraph>
        </div>
        <div style={{ margin: "30px 0" }}>
          <RefundSubtitle>7. Governing Law:</RefundSubtitle>
          <RefundParagraph>
            This Refund and Cancellation Policy shall be governed by and
            construed in accordance with Indian Laws. By using our services, you
            agree to submit to the jurisdiction of the courts in Bangalore for
            any matters arising under this policy.
          </RefundParagraph>
        </div>
      </RefundContainer>
      <Footer />
    </>
  );
};

export default RefundCancellationPolicy;
