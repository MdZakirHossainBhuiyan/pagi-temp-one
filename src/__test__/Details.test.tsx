import { render } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Details from "../Components/Details";
import { elementFinder } from "../Utilities/testUtilities";

describe("should render details components", () => {
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

    test("should render details component", async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Details />
                    </MemoryRouter>
                </BrowserRouter>
            );
          });
    
        await elementFinder("postDetails");
    });
})