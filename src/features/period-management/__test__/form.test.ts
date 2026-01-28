// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { AcademicPeriod } from "../types";
// import PeriodForm from "../components/period-form/form";

// describe("PeriodForm", () => {
//   let onSubmit: ReturnType<typeof vi.fn>;
//   let onCancel: ReturnType<typeof vi.fn>;

//   beforeEach(() => {
//     onSubmit = vi.fn();
//     onCancel = vi.fn();
//   });

  // describe("Rendering", () => {
  //   it("should render form with all required fields", () => {
  //     render(
  //       <PeriodForm
  //         onSubmit={ onSubmit }
  //         onCancel = { onCancel }
  //       />
  //     );
  //     expect(screen.getByLabelText(/Tahun Akademik/i)).toBeInTheDocument();
  //     expect(screen.getByLabelText(/Tipe Semester/i)).toBeInTheDocument();
  //     expect(screen.getByLabelText(/Status Period Academic/i)).toBeInTheDocument();
  //   });

  //   it("should render submit and cancel buttons", () => {
  //     render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

  //     expect(screen.getByRole("button", { name: /Batal/i })).toBeInTheDocument();
  //     expect(screen.getByRole("button", { name: /Simpan/i })).toBeInTheDocument();
  //   });

  //   it("should have form with correct id attribute", () => {
  //     render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

  //     const form = screen.getByRole("button", { name: /Simpan/i }).closest("form");
  //     expect(form).toHaveAttribute("id", "form-periods");
  //   });
  // });

//   describe("Default Values", () => {
//     it("should initialize form with default values when provided", async () => {
//       const defaultValues: Partial<AcademicPeriod> = {
//         id: "test-id",
//         year: 2024,
//         semester_type: "GANJIL",
//         academic_state: "ONGOING",
//       };

//       render(
//         <PeriodForm
//           onSubmit={onSubmit}
//           onCancel={onCancel}
//           defaultValues={defaultValues}
//         />
//       );

//       await waitFor(() => {
//         expect(screen.getByDisplayValue(/2024/)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(/GANJIL/)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(/ONGOING/)).toBeInTheDocument();
//       });
//     });

//     it("should initialize with default state when no defaultValues provided", () => {
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       expect(screen.getByDisplayValue(/Pilih Tahun Akademik/)).toBeInTheDocument();
//       expect(screen.getByDisplayValue(/Pilih Tipe Semester/)).toBeInTheDocument();
//       expect(screen.getByDisplayValue(/Pilih Status/)).toBeInTheDocument();
//     });

//     it("should reset form when defaultValues changes", async () => {
//       const { rerender } = render(
//         <PeriodForm onSubmit={onSubmit} onCancel={onCancel} />
//       );

//       const defaultValues: Partial<AcademicPeriod> = {
//         id: "test-id",
//         year: 2023,
//         semester_type: "GENAP",
//         academic_state: "PLANNING",
//       };

//       rerender(
//         <PeriodForm
//           onSubmit={onSubmit}
//           onCancel={onCancel}
//           defaultValues={defaultValues}
//         />
//       );

//       await waitFor(() => {
//         expect(screen.getByDisplayValue(/2023/)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(/GENAP/)).toBeInTheDocument();
//       });
//     });
//   });

//   describe("Year Selection", () => {
//     it("should generate year options for 21 years range", () => {
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const currentYear = new Date().getFullYear();
//       const startYear = currentYear - 10;
//       const endYear = currentYear + 10;

//       // Open year select
//       const yearTrigger = screen.getAllByText(/Pilih/)[0].closest("button");
//       expect(yearTrigger).toBeInTheDocument();
//     });

//     it("should allow selecting a year from the dropdown", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const yearTrigger = screen.getByRole("button", {
//         name: /Pilih Tahun Akademik/i,
//       });

//       await user.click(yearTrigger);

//       // Year options should be available
//       const currentYear = new Date().getFullYear();
//       const yearOption = screen.getByRole("option", {
//         name: new RegExp(`${currentYear}/${currentYear + 1}`),
//       });

//       expect(yearOption).toBeInTheDocument();
//     });
//   });

//   describe("Semester Type Selection", () => {
//     it("should display all semester type options", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const semesterTrigger = screen.getByRole("button", {
//         name: /Pilih Tipe Semester/i,
//       });

//       await user.click(semesterTrigger);

//       expect(screen.getByRole("option", { name: /GANJIL/ })).toBeInTheDocument();
//       expect(screen.getByRole("option", { name: /GANJIL_PENDEK/ })).toBeInTheDocument();
//       expect(screen.getByRole("option", { name: /GENAP/ })).toBeInTheDocument();
//       expect(screen.getByRole("option", { name: /GENAP_PENDEK/ })).toBeInTheDocument();
//     });

//     it("should allow selecting a semester type", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const semesterTrigger = screen.getByRole("button", {
//         name: /Pilih Tipe Semester/i,
//       });

//       await user.click(semesterTrigger);
//       const option = screen.getByRole("option", { name: /GANJIL/ });
//       await user.click(option);

//       expect(screen.getByDisplayValue(/GANJIL/)).toBeInTheDocument();
//     });
//   });

//   describe("Academic State Selection", () => {
//     it("should display all academic state options", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const stateTrigger = screen.getByRole("button", {
//         name: /Pilih Status/i,
//       });

//       await user.click(stateTrigger);

//       expect(screen.getByRole("option", { name: /PLANNING/ })).toBeInTheDocument();
//       expect(screen.getByRole("option", { name: /ONGOING/ })).toBeInTheDocument();
//       expect(screen.getByRole("option", { name: /CLOSE/ })).toBeInTheDocument();
//     });

//     it("should allow selecting an academic state", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const stateTrigger = screen.getByRole("button", {
//         name: /Pilih Status/i,
//       });

//       await user.click(stateTrigger);
//       const option = screen.getByRole("option", { name: /ONGOING/ });
//       await user.click(option);

//       expect(screen.getByDisplayValue(/ONGOING/)).toBeInTheDocument();
//     });
//   });

//   describe("Form Submission", () => {
//     it("should call onSubmit with correct data when form is submitted", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const currentYear = new Date().getFullYear();

//       // Select year
//       const yearTrigger = screen.getByRole("button", {
//         name: /Pilih Tahun Akademik/i,
//       });
//       await user.click(yearTrigger);
//       const yearOption = screen.getByRole("option", {
//         name: new RegExp(`${currentYear}/${currentYear + 1}`),
//       });
//       await user.click(yearOption);

//       // Select semester type
//       const semesterTrigger = screen.getByRole("button", {
//         name: /Pilih Tipe Semester/i,
//       });
//       await user.click(semesterTrigger);
//       const semesterOption = screen.getByRole("option", { name: /GANJIL/ });
//       await user.click(semesterOption);

//       // Select academic state
//       const stateTrigger = screen.getByRole("button", {
//         name: /Pilih Status/i,
//       });
//       await user.click(stateTrigger);
//       const stateOption = screen.getByRole("option", { name: /PLANNING/ });
//       await user.click(stateOption);

//       // Submit form
//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(onSubmit).toHaveBeenCalledWith({
//           year: currentYear,
//           semester_type: "GANJIL",
//           academic_state: "PLANNING",
//         });
//       });
//     });

//     it("should not submit form with invalid data", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(onSubmit).not.toHaveBeenCalled();
//       });
//     });

//     it("should submit with only required fields populated", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const currentYear = new Date().getFullYear();

//       // Select year
//       const yearTrigger = screen.getByRole("button", {
//         name: /Pilih Tahun Akademik/i,
//       });
//       await user.click(yearTrigger);
//       const yearOption = screen.getByRole("option", {
//         name: new RegExp(`${currentYear}/${currentYear + 1}`),
//       });
//       await user.click(yearOption);

//       // Select semester type
//       const semesterTrigger = screen.getByRole("button", {
//         name: /Pilih Tipe Semester/i,
//       });
//       await user.click(semesterTrigger);
//       const semesterOption = screen.getByRole("option", { name: /GANJIL/ });
//       await user.click(semesterOption);

//       // Select academic state
//       const stateTrigger = screen.getByRole("button", {
//         name: /Pilih Status/i,
//       });
//       await user.click(stateTrigger);
//       const stateOption = screen.getByRole("option", { name: /ONGOING/ });
//       await user.click(stateOption);

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(onSubmit).toHaveBeenCalledWith({
//           year: currentYear,
//           semester_type: "GANJIL",
//           academic_state: "ONGOING",
//         });
//         expect(onSubmit).toHaveBeenCalledTimes(1);
//       });
//     });
//   });

//   describe("Cancel Button", () => {
//     it("should call onCancel when cancel button is clicked", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const cancelButton = screen.getByRole("button", { name: /Batal/i });
//       await user.click(cancelButton);

//       expect(onCancel).toHaveBeenCalledTimes(1);
//     });

//     it("should not call onSubmit when cancel button is clicked", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const cancelButton = screen.getByRole("button", { name: /Batal/i });
//       await user.click(cancelButton);

//       expect(onSubmit).not.toHaveBeenCalled();
//     });
//   });

//   describe("Form Updates with Edit Mode", () => {
//     it("should update form fields when editing existing period", async () => {
//       const user = userEvent.setup();
//       const defaultValues: Partial<AcademicPeriod> = {
//         id: "period-1",
//         year: 2023,
//         semester_type: "GANJIL",
//         academic_state: "PLANNING",
//       };

//       const { rerender } = render(
//         <PeriodForm
//           onSubmit={onSubmit}
//           onCancel={onCancel}
//           defaultValues={defaultValues}
//         />
//       );

//       await waitFor(() => {
//         expect(screen.getByDisplayValue(/2023/)).toBeInTheDocument();
//       });

//       // Update default values (simulating edit of another period)
//       const updatedValues: Partial<AcademicPeriod> = {
//         id: "period-2",
//         year: 2024,
//         semester_type: "GENAP",
//         academic_state: "ONGOING",
//       };

//       rerender(
//         <PeriodForm
//           onSubmit={onSubmit}
//           onCancel={onCancel}
//           defaultValues={updatedValues}
//         />
//       );

//       await waitFor(() => {
//         expect(screen.getByDisplayValue(/2024/)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(/GENAP/)).toBeInTheDocument();
//         expect(screen.getByDisplayValue(/ONGOING/)).toBeInTheDocument();
//       });
//     });

//     it("should exclude id from submission data", async () => {
//       const user = userEvent.setup();
//       const defaultValues: Partial<AcademicPeriod> = {
//         id: "test-id",
//         year: 2024,
//         semester_type: "GANJIL",
//         academic_state: "PLANNING",
//       };

//       render(
//         <PeriodForm
//           onSubmit={onSubmit}
//           onCancel={onCancel}
//           defaultValues={defaultValues}
//         />
//       );

//       await waitFor(() => {
//         expect(screen.getByDisplayValue(/2024/)).toBeInTheDocument();
//       });

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(onSubmit).toHaveBeenCalledWith({
//           year: 2024,
//           semester_type: "GANJIL",
//           academic_state: "PLANNING",
//         });
//         // Verify id is not included in submission
//         const callArgs = onSubmit.mock.calls[0][0];
//         expect(callArgs).not.toHaveProperty("id");
//       });
//     });
//   });

//   describe("Field Validation", () => {
//     it("should show validation error when required fields are empty", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       expect(onSubmit).not.toHaveBeenCalled();
//     });

//     it("should validate year field", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const currentYear = new Date().getFullYear();

//       // Select only semester type and state, skip year
//       const semesterTrigger = screen.getByRole("button", {
//         name: /Pilih Tipe Semester/i,
//       });
//       await user.click(semesterTrigger);
//       const semesterOption = screen.getByRole("option", { name: /GANJIL/ });
//       await user.click(semesterOption);

//       const stateTrigger = screen.getByRole("button", {
//         name: /Pilih Status/i,
//       });
//       await user.click(stateTrigger);
//       const stateOption = screen.getByRole("option", { name: /PLANNING/ });
//       await user.click(stateOption);

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       expect(onSubmit).not.toHaveBeenCalled();
//     });

//     it("should validate semester_type field", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const currentYear = new Date().getFullYear();

//       // Select only year and state, skip semester
//       const yearTrigger = screen.getByRole("button", {
//         name: /Pilih Tahun Akademik/i,
//       });
//       await user.click(yearTrigger);
//       const yearOption = screen.getByRole("option", {
//         name: new RegExp(`${currentYear}/${currentYear + 1}`),
//       });
//       await user.click(yearOption);

//       const stateTrigger = screen.getByRole("button", {
//         name: /Pilih Status/i,
//       });
//       await user.click(stateTrigger);
//       const stateOption = screen.getByRole("option", { name: /PLANNING/ });
//       await user.click(stateOption);

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       expect(onSubmit).not.toHaveBeenCalled();
//     });

//     it("should validate academic_state field", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const currentYear = new Date().getFullYear();

//       // Select only year and semester, skip state
//       const yearTrigger = screen.getByRole("button", {
//         name: /Pilih Tahun Akademik/i,
//       });
//       await user.click(yearTrigger);
//       const yearOption = screen.getByRole("option", {
//         name: new RegExp(`${currentYear}/${currentYear + 1}`),
//       });
//       await user.click(yearOption);

//       const semesterTrigger = screen.getByRole("button", {
//         name: /Pilih Tipe Semester/i,
//       });
//       await user.click(semesterTrigger);
//       const semesterOption = screen.getByRole("option", { name: /GANJIL/ });
//       await user.click(semesterOption);

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       expect(onSubmit).not.toHaveBeenCalled();
//     });
//   });

//   describe("Accessibility", () => {
//     it("should have proper labels for form inputs", () => {
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       expect(screen.getByLabelText(/Tahun Akademik/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/Tipe Semester/i)).toBeInTheDocument();
//       expect(screen.getByLabelText(/Status Period Academic/i)).toBeInTheDocument();
//     });

//     it("should have aria-invalid attribute on select triggers", () => {
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const triggers = screen.getAllByRole("button", { name: /Pilih/ });
//       triggers.forEach((trigger) => {
//         expect(trigger).toHaveAttribute("aria-invalid", "false");
//       });
//     });

//     it("should have proper button types", () => {
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const cancelButton = screen.getByRole("button", { name: /Batal/i });
//       const submitButton = screen.getByRole("button", { name: /Simpan/i });

//       expect(cancelButton).toHaveAttribute("type", "button");
//       expect(submitButton).toHaveAttribute("type", "submit");
//     });
//   });

//   describe("Multiple Submissions", () => {
//     it("should handle multiple submissions with different data", async () => {
//       const user = userEvent.setup();
//       render(<PeriodForm onSubmit={onSubmit} onCancel={onCancel} />);

//       const currentYear = new Date().getFullYear();

//       // First submission
//       const yearTrigger = screen.getByRole("button", {
//         name: /Pilih Tahun Akademik/i,
//       });
//       await user.click(yearTrigger);
//       const yearOption = screen.getByRole("option", {
//         name: new RegExp(`${currentYear}/${currentYear + 1}`),
//       });
//       await user.click(yearOption);

//       const semesterTrigger = screen.getByRole("button", {
//         name: /Pilih Tipe Semester/i,
//       });
//       await user.click(semesterTrigger);
//       const semesterOption = screen.getByRole("option", { name: /GANJIL/ });
//       await user.click(semesterOption);

//       const stateTrigger = screen.getByRole("button", {
//         name: /Pilih Status/i,
//       });
//       await user.click(stateTrigger);
//       const stateOption = screen.getByRole("option", { name: /PLANNING/ });
//       await user.click(stateOption);

//       const submitButton = screen.getByRole("button", { name: /Simpan/i });
//       await user.click(submitButton);

//       await waitFor(() => {
//         expect(onSubmit).toHaveBeenCalledTimes(1);
//       });
//     });
//   });
// });