import { fireEvent, render, screen } from "@testing-library/react";
import {
  ActionType,
  TimerStateValue,
} from "../../services/reducers/timer-reducer";
import { Todo } from "../../services/reducers/todos-reducer";

import { Timer, Todos } from "./components";

describe("Home tests", () => {
  describe("Timer tests", () => {
    describe("Timer Component", () => {
      const currentTodo = "Run 10k";

      const props = {
        currentTodo,
        minutes: 10,
        seconds: 0,
        newState: ActionType.Start,
        timerState: TimerStateValue.Stopped,
        onStartStop: jest.fn(),
        onPause: jest.fn(),
        onResume: jest.fn(),
      };

      beforeEach(() => {
        render(<Timer.TimerComponent {...props} />);
      });

      it("should render", async () => {
        expect(
          await screen.findByText(`Current todo: ${currentTodo}`)
        ).toBeInTheDocument();
      });

      it("should call the right event handlers", async () => {
        const startButton = await screen.findByText("Start");
        fireEvent.change(startButton, {});

        expect(props.onStartStop.mock.calls).toEqual([]);
      });
    });
  });

  describe("Todos tests", () => {
    describe("Todos Component", () => {
      const currentTodo = "Run 10k";

      const remainingTodos: Todo[] = [
        { text: "Run 20k", guid: "guid", count: 1 },
      ];

      const props = {
        text: currentTodo,
        onChange: jest.fn(),
        remainingTodos,
        completedTodos: [],
        timerDuration: 30,
        selectedTodoGuid: undefined,
        timerState: TimerStateValue.Stopped,

        onSelected: jest.fn(),

        onAdd: jest.fn(),
        onIncrease: jest.fn(),
        onDecrease: jest.fn(),
        onDelete: jest.fn(),
      };

      beforeEach(() => {
        render(<Todos.TodosComponent {...props} />);
      });

      describe("should call the right event handler", () => {
        [
          { id: "add", handler: props.onAdd },
          { id: "increase", handler: props.onIncrease },
          { id: "decrease", handler: props.onDecrease },
          { id: "delete", handler: props.onDelete },
        ].map((element) => {
          it(`for button ${element.id}`, async () => {
            const button = await screen.findByTestId(`${element.id}-button`);
            fireEvent.change(button, {});

            expect(element.handler.mock.calls).toEqual([]);
          });
        });
      });
    });
  });
});
