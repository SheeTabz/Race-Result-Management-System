import React from 'react';

const RaceInformationView = ({race}) => {
  
    return (
        <div>

             <form className='input-form'>
        {/* <h2>{race.name} - Race Information</h2> */}
        <div className="w-full flex-1">
          <label className="input-label">Race Title</label>
          <div className="input-wrapper">
            <input
              name="race-title"
              placeholder="Provide title"
              className="input"
              defaultValue={race.name}
            />
          </div>
        </div>
        <div className="w-full flex-1">
          <label className="input-label">Start Date</label>
          <div className="input-wrapper">
            <input
              type={'date'}
              name="start-date"
              className="input"
              defaultValue={race.startDate}
            />
          </div>
        </div>
        <div className="w-full flex-1">
          <label className="input-label">End Date</label>
          <div className="input-wrapper">
            <input
              type={'date'}
              name="end-date"
              className="input"
              defaultValue={race.endDate}
            />
          </div>
        </div>
        <div className="w-full flex-1">
          <label className="input-label">Description</label>
          <div className="input-wrapper">
            <textarea
              name="description"
              placeholder="Description"
              rows={4}
              className="input"
              defaultValue={race.description}
            ></textarea>
          </div>
        </div>
        <button type='submit' className="mt-2 w-full appearance-none p-1 px-2 text-white outline-none bg-blue-800">Edit</button>
      </form>

        </div>
    );
}

export default RaceInformationView;

