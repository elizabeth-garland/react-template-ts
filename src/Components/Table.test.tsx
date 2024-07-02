import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Table from "./Table.tsx";
import React from "react";

const mockData = [
    {
        id: 2,
        merchant: "Waterstones",
        amount: 999,
        description: "Programming book",
        date: "2022-05-22T12:00:00.000Z",
        category: "training",
        status: "draft"
    },
    {
        id: 3,
        merchant: "BA",
        amount: 434.22,
        description: "Flight",
        date: "2022-05-04T12:00:00.000Z",
        category: "travel",
        status: "draft"
    },
    {
        id: 4,
        merchant: "Wasabi",
        amount: 7.25,
        description: "Meal for at engineering conference",
        date: "2022-05-04T12:00:00.000Z",
        category: "meals",
        status: "draft"
    }
];

describe("Renders a table", () => {
    it("Renders a table with data", () => {
        render(<Table data={mockData} />);
        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();
        expect(table).toHaveTextContent("Waterstones");
        expect(table).toHaveTextContent("999");
    });
});

// TODO: Would do more tests