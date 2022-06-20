import React from 'react'
import { render, screen } from '@testing-library/react'
import { RecoilRoot } from 'recoil'
import { useParticipantsList } from '../state/hooks/useParticipantsList'
import { ParticipantsList } from './ParticipantsList'
  

  jest.mock('../state/hooks/useParticipantsList', () => {
    return { useParticipantsList: jest.fn() }
  })

  describe('empty list', () => {

    beforeEach(() => {
      (useParticipantsList as jest.Mock).mockReturnValue([])
    })

    test('render participants list empty', () => {
      render(
        <RecoilRoot>
          <ParticipantsList />
        </RecoilRoot>
      )
  
      const items = screen.queryAllByRole('listItem')
      expect(items).toHaveLength(0)
    })
  })
  
  describe('filled list', () => {

    const participantsList = [
      'Maria',
      'João',
      'Francisco'
    ]

    beforeEach(() => {
      (useParticipantsList as jest.Mock).mockReturnValue(participantsList)
    })

    test('filled participants list', () => {
      render(
        <RecoilRoot>
          <ParticipantsList />
        </RecoilRoot>
      )
      
      const items = screen.queryAllByRole('litItems')
      expect(items).toHaveLength(participantsList.length)
    })
  })

  