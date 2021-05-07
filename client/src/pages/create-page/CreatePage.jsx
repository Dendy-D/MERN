import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import { useHistory } from 'react-router-dom'

import './create.css'

const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState('')

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )
        history.push(`/detail/${data.link._id}`)
        console.log(data)
      } catch (e) {}
    }
  }

  useEffect(() => {
    window.M.updateTextFields()
  }, [])
  return (
    <div className='row'>
      <div className='col s8 offset-s2 create'>
        <div className='input-field'>
          <h3 className='min-header'>Input the link</h3>
          <input
            placeholder='Insert the link'
            id='link'
            type='text'
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          {/* <label htmlFor='link'>Input the link</label> */}
        </div>
      </div>
    </div>
  )
}

export default CreatePage
