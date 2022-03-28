import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

export const renderWithMemoryRouter = (
    initialEntries: string,
    Element: React.ReactChild | React.ReactElement
  ) => {
    return render(
      <MemoryRouter initialEntries={[initialEntries]}>{Element}</MemoryRouter>
    );
};

export const textExpecter = (text: string) => {
    return expect(screen.getByText(text)).toBeInTheDocument();
}

export const elementFinder = async (text: string, delay?: number) => {
    return expect(
      await screen.findByTestId(text, {}, { timeout: delay || 1000 })
    ).toBeInTheDocument();
};

export const textFinderRx = async (text: string) => {
    return expect(
      await screen.findByText(new RegExp(text), {}, { timeout: 1000 })
    ).toBeInTheDocument();
};

export const buttonClickerAsync = async (button: string, btnNumber: number) => {
  userEvent.click(await screen.findByText(button), { button: btnNumber });
};