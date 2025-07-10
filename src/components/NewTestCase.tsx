import React, { useState } from 'react'

const NewTestCase = () => {
    const [formData, setFormData] = useState({
        name: '',
        inputFile: null,
        outputFile: null,
        testType: '',
        description: '',
      });
    
      const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // handle API/form submission here
      };
  return (
    <div>
      <h1 className='text-2xl mb-2'>Add New Test Case</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='grid grid-cols-2 gap-4'>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Test Case Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
                required
            />
          </div>
          <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">New Test</label>
          <select
            name="testType"
            value={formData.testType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a test</option>
            <option value="unit">Unit Test</option>
            <option value="integration">Integration Test</option>
            <option value="e2e">End-to-End Test</option>
          </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter test description"
            rows={3}
            className="w-full border border-gray-300 p-2 rounded focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className='grid grid-cols-2 gap-4'>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Input File</label>
            <input
                type="file"
                name="inputFile"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                required
            />
            </div>
            <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Output File</label>
            <input
                type="file"
                name="outputFile"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
                required
            />
            </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded float-end">
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewTestCase
