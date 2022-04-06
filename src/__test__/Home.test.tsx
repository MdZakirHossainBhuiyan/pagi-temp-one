import {render, screen, waitFor} from '@testing-library/react';
import axios from 'axios';
import { elementFinder, renderWithMemoryRouter, buttonClickerAsync } from '../Utilities/testUtilities';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Home from '../Components/Home';

describe("Testing Home Component", () => {
    beforeEach(async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
          data: [
              {
                created_at: "2022-03-23T01:29:56.000Z",
                title: "Nvidia Announces Hopper Architecture, the Next Generation of Accelerated",
                url: "https://nvidianews.nvidia.com/news/nvidia-announces-hopper-architecture-the-next-generation-of-accelerated-computing",
                author: "RafelMri",
              },
            ],
        });
    });

    test("should initially render header of component", async () => {
        await act(async () => {
            renderWithMemoryRouter("/", <Home />);
        });

        waitFor(() => {
            expect(screen.getByText("Post List")).toBeInTheDocument();
        });
    });

    test("should render loader of component", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
        });
    
        await elementFinder("loaderTest");
    });

    test("should render header part of table", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
        });
    
        await elementFinder("tableHeader");
    });

    test("should render body part of table", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
        });
    
        await elementFinder("tableBody");
    });

    test("should render raw JSON if clicked on a post", async () => {
        await act(async () => {
            renderWithMemoryRouter("/", <Home />);
        });

        buttonClickerAsync(
            "Nvidia Announces Hopper Architecture, the Next Generation of Accelerated",
            0
        );

        waitFor(() => {
            expect(screen.getByTestId("detailsPosts")).toBeInTheDocument();
        });
    });

    test("should render pagination", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
        });
    
        await elementFinder("pagePagination");
    });  
})