import React, { useState } from 'react'

const AddDrop = () => {
  const prebuiltTags = [
    'JavaScript',
    'React',
    'Node.js',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Redux',
    'TypeScript',
  ]
  const [selectedTags, setSelectedTags] = useState([])

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }
  return (
    <div className='container mx-auto p-4'>
      <center className='self-center text-3xl mb-5 font-bold text-green-900'>
        <b>Add Drop</b>
      </center>
      <form className='max-w-md mx-auto bg-green-200 p-6 rounded-md shadow-md'>
        <div className='mb-4'>
          <label
            htmlFor='snippetName'
            className='block text-sm font-bold text-green-900'
          >
            Snippet Name
          </label>
          <input
            type='text'
            id='snippetName'
            name='snippetName'
            className='mt-1 p-2 w-full border rounded-md bg-green-50'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='codeBlock'
            className='block text-sm font-bold text-green-900'
          >
            Code Block
          </label>
          <textarea
            id='codeBlock'
            name='codeBlock'
            rows='6'
            className='mt-1 p-2 w-full border rounded-md bg-green-50'
          ></textarea>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='codeName'
            className='block text-sm font-bold text-green-900'
          >
            Source Code Name
          </label>
          <input
            type='text'
            id='codeName'
            name='codeName'
            className='mt-1 p-2 w-full border rounded-md bg-green-50'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-sm font-bold text-green-900'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            rows='4'
            className='mt-1 p-2 w-full border rounded-md bg-green-50'
          ></textarea>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-sm mb-2 font-bold text-green-900'
          >
            Tags
          </label>
          <div className='flex flex-wrap'>
            {prebuiltTags.map((tag) => (
              <div
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`cursor-pointer rounded-full border px-3 py-1 m-2 
                        ${
                          selectedTags.includes(tag)
                            ? 'bg-green-900 text-green-100'
                            : 'border-green-900 text-green-900'
                        }`}
              >
                {tag}
              </div>
            ))}
          </div>
          <div className='flex items-center justify-end'>
            <button
              type='submit'
              className='bg-green-700 mt-4 hover:bg-green-800 font-bold text-green-100 py-2 px-4 rounded-full'
            >
              Add Drop
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddDrop
