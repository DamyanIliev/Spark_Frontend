import { React,  Component } from "react";
import { Form, Radio } from 'semantic-ui-react';

const gameDifficulties = [
    {
      level: 'Easy',
      label: 'Лесно (20 опита)',
      attempts: 20
    },
    {
      level: 'Hard',
      label: 'Трудно (10 опита)',
      attempts: 10
    }
  ];


export default class Difficulties extends Component {

    state = {
        gameDifficulties,
        selectedDifficulty: 30
      };

    handleChange = (e, { value }) => { 
      this.setState({ selectedDifficulty: value })
      this.props.data.setNumberOfAttempts(value);
    };

    render() {
        const radioMarkup = this.state.gameDifficulties.map(({ label, attempts }) => {
            return (
                <Form.Field>
                    <Radio
                        label = { label }
                        name = 'radioGroup'
                        value = { attempts }
                        onChange = { this.handleChange }
                        checked = { this.state.selectedDifficulty === attempts }
                    />
                </Form.Field>
            );
        });

        return (
            <div className=" p-1 w-[40%] m-auto text-left border border-radius-[20px]">
                <Form>
                    { radioMarkup }
                </Form>
            </div>
        );
    }
}