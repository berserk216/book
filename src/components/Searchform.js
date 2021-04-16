import React from "react"
import {Button, Col, Form} from "react-bootstrap"


const search = ( {
    loading, 
    searchinput, 
    handlesearchange, 
    handlesubmit,
}) => {
    return (
        <Form onSubmit = {handlesubmit}>
            <Form.Row>
                <Col>
                <Form.Control placeholder = "search"
                value ={searchinput}
                onChange = {handlesearchange}/>
                </Col>
                {loading ? (
                    <Button disabled >
                        <span 
                        className='spinner-border spinner-border-s'
                        role= "status"
                        aria-hidden= "true">
                        </span>
                        Search 
                    </Button>
                ) : (
                    <Button type= "submit" >Search</Button>

                )
            }
            </Form.Row>
        </Form>
    )
    }


    export default search;

