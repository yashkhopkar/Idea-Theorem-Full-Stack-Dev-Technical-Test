import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();
  const [alertInfo, setAlertInfo] = useState({ message: '', type: '' });

  const onSubmit = async (data) => {
    setAlertInfo({ message: '', type: '' });

    clearErrors();

    const date_of_birth = `${data.year}-${String(data.month).padStart(
      2,
      '0'
    )}-${String(data.day).padStart(2, '0')}`;

    const postData = {
      ...data,
      date_of_birth,
    };

    delete postData.day;
    delete postData.month;
    delete postData.year;

    try {
      const response = await axios.post(
        'https://fullstack-test-navy.vercel.app/api/users/create',
        postData
      );
      setAlertInfo({ message: response.data.description, type: 'success' });
      reset();
    } catch (error) {
      setAlertInfo({
        message: error.response?.data.description || 'An error occurred',
        type: 'danger',
      });
    }
  };

  return (
    <>
      <Container
        fluid
        className='registration-form-header'
      >
        <Row>
          <b>Create User Account</b>
        </Row>
      </Container>

      {alertInfo.message && (
        <Row>
          <Col>
            <Alert
              variant={alertInfo.type}
              className='mt-4 mobile-alert'
            >
              {alertInfo.message}
            </Alert>
          </Col>
        </Row>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container
          fluid
          className='registration-form-container'
        >
          <Form.Group as={Row}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='text'
              {...register('full_name', {
                required: 'Full name is required',
                pattern: {
                  value: /^[A-Za-z ]+$/i,
                  message:
                    'Full name must not contain numbers or special characters',
                },
              })}
              isInvalid={!!errors.full_name}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.full_name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type='tel'
              {...register('contact_number', {
                required: 'Contact number is required',
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: 'Invalid Canadian phone number format',
                },
              })}
              isInvalid={!!errors.contact_number}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.contact_number?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label>Birthdate</Form.Label>
          </Form.Group>

          <Form.Group as={Row}>
            <Col>
              <Form.Control
                as='select'
                {...register('day', { required: 'Day is required' })}
                isInvalid={!!errors.day}
              >
                <option value=''>Day</option>
                {[...Array(31)].map((_, i) => (
                  <option
                    key={i}
                    value={i + 1}
                  >
                    {i + 1}
                  </option>
                ))}
              </Form.Control>
              {errors.day && (
                <Form.Control.Feedback type='invalid'>
                  {errors.day.message}
                </Form.Control.Feedback>
              )}
            </Col>
            <Col>
              <Form.Control
                as='select'
                {...register('month', { required: 'Month is required' })}
                isInvalid={!!errors.month}
              >
                <option value=''>Month</option>
                {[
                  '01',
                  '02',
                  '03',
                  '04',
                  '05',
                  '06',
                  '07',
                  '08',
                  '09',
                  '10',
                  '11',
                  '12',
                ].map((month, index) => (
                  <option
                    key={index}
                    value={month}
                  >
                    {month}
                  </option>
                ))}
              </Form.Control>
              {errors.month && (
                <Form.Control.Feedback type='invalid'>
                  {errors.month.message}
                </Form.Control.Feedback>
              )}
            </Col>
            <Col>
              <Form.Control
                as='select'
                {...register('year', { required: 'Year is required' })}
                isInvalid={!!errors.year}
              >
                <option value=''>Year</option>
                {[...Array(100)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  );
                })}
              </Form.Control>
              {errors.year && (
                <Form.Control.Feedback type='invalid'>
                  {errors.year.message}
                </Form.Control.Feedback>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format',
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                  message:
                    'Password must contain 8 characters, at least one uppercase letter, one lowercase letter, and one number',
                },
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              {...register('confirm_password', {
                validate: (value) =>
                  value === watch('password') || 'The passwords do not match',
              })}
              isInvalid={!!errors.confirm_password}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.confirm_password?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Container>

        <Container
          fluid
          style={{ padding: '2rem' }}
        >
          <Row className='mt-4'>
            <Col className='d-flex justify-content-center'>
              <Button
                variant='light'
                className='me-2 cancel-btn'
                style={{
                  width: '150px',
                  height: '46px',
                  marginRight: '15px',
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='submit-btn'
                style={{
                  width: '150px',
                  height: '46px',
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default RegistrationForm;
